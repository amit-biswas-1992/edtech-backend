import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service.js';
import { UserEntity } from '../entities/user.entity.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { GoogleLoginDto } from './dto/google-login.dto.js';
import { PhoneRegisterDto } from './dto/phone-register.dto.js';
import { PhoneLoginDto } from './dto/phone-login.dto.js';

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
    phone?: string | null;
  };
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return this.generateAuthResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmailWithPassword(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAuthResponse(user);
  }

  async googleLogin(dto: GoogleLoginDto): Promise<AuthResponse> {
    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const client = new OAuth2Client(googleClientId);

    try {
      const ticket = await client.verifyIdToken({
        idToken: dto.idToken,
        audience: googleClientId,
      });
      const payload = ticket.getPayload();
      if (!payload) throw new UnauthorizedException('Invalid Google token');

      const { sub: googleId, email, name, picture } = payload;

      // Check if user exists by googleId
      let user = await this.usersService.findByGoogleId(googleId);

      if (!user && email) {
        // Check if user exists by email (link accounts)
        user = await this.usersService.findByEmail(email);
        if (user) {
          // Link Google to existing account
          user.googleId = googleId;
          user.avatar = picture || user.avatar;
          await this.usersService.update(user.id, {
            googleId,
            avatar: picture,
          });
        }
      }

      if (!user) {
        // Create new user
        user = await this.usersService.createGoogleUser({
          name: name || 'Google User',
          email: email || '',
          googleId,
          avatar: picture,
        });
      }

      return this.generateAuthResponse(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Failed to verify Google token');
    }
  }

  async phoneRegister(dto: PhoneRegisterDto): Promise<AuthResponse> {
    const existing = await this.usersService.findByPhone(dto.phone);
    if (existing) throw new ConflictException('Phone number already registered');

    const hashedPin = await bcrypt.hash(dto.pin, 10);
    const user = await this.usersService.createPhoneUser({
      name: dto.name,
      phone: dto.phone,
      pin: hashedPin,
    });

    return this.generateAuthResponse(user);
  }

  async phoneLogin(dto: PhoneLoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByPhoneWithPin(dto.phone);
    if (!user || !user.pin)
      throw new UnauthorizedException('Invalid phone or PIN');

    const isValid = await bcrypt.compare(dto.pin, user.pin);
    if (!isValid) throw new UnauthorizedException('Invalid phone or PIN');

    return this.generateAuthResponse(user);
  }

  async validateUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private generateAuthResponse(user: UserEntity): AuthResponse {
    const payload = { sub: user.id, email: user.email, phone: user.phone };
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
