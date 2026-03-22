import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CoursesService } from './courses.service.js';
import { CoursesController } from './courses.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, SiteEntity])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
