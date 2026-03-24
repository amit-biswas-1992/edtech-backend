import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamAttemptEntity } from '../entities/exam-attempt.entity.js';
import { ExamEntity } from '../entities/exam.entity.js';
import { QuestionEntity } from '../entities/question.entity.js';
import { ExamAttemptsService } from './exam-attempts.service.js';
import { ExamAttemptsController } from './exam-attempts.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamAttemptEntity, ExamEntity, QuestionEntity]),
  ],
  controllers: [ExamAttemptsController],
  providers: [ExamAttemptsService],
  exports: [ExamAttemptsService],
})
export class ExamAttemptsModule {}
