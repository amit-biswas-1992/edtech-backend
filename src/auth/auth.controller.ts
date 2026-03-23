import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { GoogleLoginDto } from './dto/google-login.dto.js';
import { PhoneRegisterDto } from './dto/phone-register.dto.js';
import { PhoneLoginDto } from './dto/phone-login.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('google')
  @ApiOperation({ summary: 'Login with Google' })
  @ApiResponse({ status: 200, description: 'Google login successful' })
  @ApiResponse({ status: 401, description: 'Invalid Google token' })
  async googleLogin(@Body() dto: GoogleLoginDto) {
    return this.authService.googleLogin(dto);
  }

  @Post('phone/register')
  @ApiOperation({ summary: 'Register with phone and PIN' })
  @ApiResponse({ status: 201, description: 'Phone registration successful' })
  @ApiResponse({ status: 409, description: 'Phone number already registered' })
  async phoneRegister(@Body() dto: PhoneRegisterDto) {
    return this.authService.phoneRegister(dto);
  }

  @Post('phone/login')
  @ApiOperation({ summary: 'Login with phone and PIN' })
  @ApiResponse({ status: 200, description: 'Phone login successful' })
  @ApiResponse({ status: 401, description: 'Invalid phone or PIN' })
  async phoneLogin(@Body() dto: PhoneLoginDto) {
    return this.authService.phoneLogin(dto);
  }
}
