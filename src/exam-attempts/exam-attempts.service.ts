import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ExamAttemptEntity,
  AttemptStatus,
} from '../entities/exam-attempt.entity.js';
import { ExamEntity } from '../entities/exam.entity.js';
import { QuestionEntity } from '../entities/question.entity.js';
import { SubmitAttemptDto } from './dto/submit-attempt.dto.js';

@Injectable()
export class ExamAttemptsService {
  constructor(
    @InjectRepository(ExamAttemptEntity)
    private readonly attemptRepository: Repository<ExamAttemptEntity>,
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async startAttempt(
    siteId: string,
    examId: string,
    studentId: string,
  ): Promise<{ attempt: ExamAttemptEntity; questions: Partial<QuestionEntity>[] }> {
    const exam = await this.examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (!exam.isActive) {
      throw new BadRequestException('This exam is not active');
    }

    // Check max attempts
    if (exam.maxAttempts) {
      const existingAttempts = await this.attemptRepository.count({
        where: { examId, studentId },
      });
      if (existingAttempts >= exam.maxAttempts) {
        throw new BadRequestException('Maximum attempts reached');
      }
    }

    // Check time window for live exams
    if (exam.startTime && new Date() < new Date(exam.startTime)) {
      throw new BadRequestException('Exam has not started yet');
    }
    if (exam.endTime && new Date() > new Date(exam.endTime)) {
      throw new BadRequestException('Exam has ended');
    }

    // Check for in-progress attempt
    const inProgress = await this.attemptRepository.findOne({
      where: { examId, studentId, status: AttemptStatus.IN_PROGRESS },
    });
    if (inProgress) {
      throw new BadRequestException(
        'You already have an in-progress attempt for this exam',
      );
    }

    const attempt = this.attemptRepository.create({
      examId,
      studentId,
      siteId,
      startedAt: new Date(),
      status: AttemptStatus.IN_PROGRESS,
    });

    const savedAttempt = await this.attemptRepository.save(attempt);

    // Fetch questions without correct answers
    let questions = await this.questionRepository.find({
      where: { examId },
      order: { order: 'ASC' },
    });

    if (exam.shuffleQuestions) {
      questions = [...questions].sort(() => Math.random() - 0.5);
    }

    questions = questions.slice(0, exam.questionsPerExam);

    const strippedQuestions = questions.map((q) => {
      const { correctOptionId, explanation, explanationBn, ...rest } = q;
      return rest;
    });

    return { attempt: savedAttempt, questions: strippedQuestions };
  }

  async submitAttempt(
    examId: string,
    studentId: string,
    dto: SubmitAttemptDto,
  ): Promise<ExamAttemptEntity> {
    const attempt = await this.attemptRepository.findOne({
      where: { id: dto.attemptId, examId, studentId },
    });
    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }
    if (attempt.status !== AttemptStatus.IN_PROGRESS) {
      throw new BadRequestException('This attempt has already been submitted');
    }

    const exam = await this.examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    // Fetch all questions for this exam
    const questions = await this.questionRepository.find({
      where: { examId },
    });
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    let totalScore = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalSkipped = 0;

    const processedAnswers = dto.answers.map((answer) => {
      const question = questionMap.get(answer.questionId);
      if (!question) {
        return {
          questionId: answer.questionId,
          selectedOptionId: answer.selectedOptionId,
          isCorrect: false,
          timeTaken: answer.timeTaken || 0,
        };
      }

      if (answer.selectedOptionId === null || answer.selectedOptionId === undefined) {
        // Skipped
        totalSkipped++;
        return {
          questionId: answer.questionId,
          selectedOptionId: null,
          isCorrect: false,
          timeTaken: answer.timeTaken || 0,
        };
      }

      const isCorrect = answer.selectedOptionId === question.correctOptionId;

      if (isCorrect) {
        totalCorrect++;
        totalScore += question.marks;
      } else {
        totalWrong++;
        totalScore -= Number(exam.negativeMarking);
      }

      return {
        questionId: answer.questionId,
        selectedOptionId: answer.selectedOptionId,
        isCorrect,
        timeTaken: answer.timeTaken || 0,
      };
    });

    attempt.answers = processedAnswers;
    attempt.totalScore = Math.max(0, totalScore);
    attempt.totalCorrect = totalCorrect;
    attempt.totalWrong = totalWrong;
    attempt.totalSkipped = totalSkipped;
    attempt.status = AttemptStatus.COMPLETED;
    attempt.completedAt = new Date();

    return this.attemptRepository.save(attempt);
  }

  async getStudentAttempts(
    examId: string,
    studentId: string,
  ): Promise<ExamAttemptEntity[]> {
    return this.attemptRepository.find({
      where: { examId, studentId },
      order: { createdAt: 'DESC' },
    });
  }

  async getResult(
    attemptId: string,
    studentId: string,
  ): Promise<{ attempt: ExamAttemptEntity; questions: QuestionEntity[] }> {
    const attempt = await this.attemptRepository.findOne({
      where: { id: attemptId, studentId },
      relations: ['exam'],
    });
    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }
    if (attempt.status === AttemptStatus.IN_PROGRESS) {
      throw new BadRequestException('Attempt is still in progress');
    }

    if (!attempt.exam.showResult) {
      throw new ForbiddenException('Results are not available for this exam');
    }

    const questions = await this.questionRepository.find({
      where: { examId: attempt.examId },
      order: { order: 'ASC' },
    });

    return { attempt, questions };
  }

  async getLeaderboard(
    examId: string,
  ): Promise<ExamAttemptEntity[]> {
    return this.attemptRepository.find({
      where: { examId, status: AttemptStatus.COMPLETED },
      order: {
        totalScore: 'DESC',
      },
      relations: ['student'],
      take: 100,
    });
  }
}
