import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from '../entities/teacher.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { TeachersService } from './teachers.service.js';
import { TeachersController } from './teachers.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity, SiteEntity])],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
