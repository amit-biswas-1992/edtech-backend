import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from '../entities/exam.entity.js';
import { QuestionEntity } from '../entities/question.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { ExamsService } from './exams.service.js';
import { ExamsController } from './exams.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity, QuestionEntity, SiteEntity])],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
