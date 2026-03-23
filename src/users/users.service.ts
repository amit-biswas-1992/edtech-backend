import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, AuthProvider } from '../entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async findByPhoneWithPin(phone: string): Promise<UserEntity | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.phone = :phone', { phone })
      .addSelect('user.pin')
      .getOne();
  }

  async findByGoogleId(googleId: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { googleId } });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async createGoogleUser(data: {
    name: string;
    email: string;
    googleId: string;
    avatar?: string;
  }): Promise<UserEntity> {
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      googleId: data.googleId,
      avatar: data.avatar ?? undefined,
      authProvider: AuthProvider.GOOGLE,
    });
    return this.userRepository.save(user);
  }

  async createPhoneUser(data: {
    name: string;
    phone: string;
    pin: string;
  }): Promise<UserEntity> {
    const user = this.userRepository.create({
      name: data.name,
      phone: data.phone,
      pin: data.pin,
      authProvider: AuthProvider.PHONE,
    });
    return this.userRepository.save(user);
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    await this.userRepository.update(id, data);
    return this.findById(id) as Promise<UserEntity>;
  }
}
