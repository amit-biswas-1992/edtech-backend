import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from '../entities/exam.entity.js';
import { QuestionEntity } from '../entities/question.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreateExamDto } from './dto/create-exam.dto.js';
import { UpdateExamDto } from './dto/update-exam.dto.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(SiteEntity)
    private readonly siteRepository: Repository<SiteEntity>,
  ) {}

  private async verifySiteOwnership(
    siteId: string,
    userId: string,
  ): Promise<SiteEntity> {
    const site = await this.siteRepository.findOne({ where: { id: siteId } });
    if (!site) {
      throw new NotFoundException('Site not found');
    }
    if (site.userId !== userId) {
      throw new ForbiddenException('You do not own this site');
    }
    return site;
  }

  async create(
    siteId: string,
    userId: string,
    dto: CreateExamDto,
  ): Promise<ExamEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const exam = this.examRepository.create({
      siteId,
      ...dto,
    });

    return this.examRepository.save(exam);
  }

  async findBySiteId(siteId: string): Promise<ExamEntity[]> {
    return this.examRepository.find({
      where: { siteId },
      order: { createdAt: 'DESC' },
      relations: ['course'],
    });
  }

  async findById(examId: string): Promise<ExamEntity> {
    const exam = await this.examRepository.findOne({
      where: { id: examId },
      relations: ['course'],
    });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  async update(
    examId: string,
    userId: string,
    dto: UpdateExamDto,
  ): Promise<ExamEntity> {
    const exam = await this.examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    await this.verifySiteOwnership(exam.siteId, userId);

    Object.assign(exam, dto);
    return this.examRepository.save(exam);
  }

  async delete(examId: string, userId: string): Promise<void> {
    const exam = await this.examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    await this.verifySiteOwnership(exam.siteId, userId);
    await this.examRepository.remove(exam);
  }

  async bulkAddQuestions(
    examId: string,
    userId: string,
    questions: CreateQuestionDto[],
  ): Promise<QuestionEntity[]> {
    const exam = await this.examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    await this.verifySiteOwnership(exam.siteId, userId);

    const entities = questions.map((q) =>
      this.questionRepository.create({
        examId,
        ...q,
      }),
    );

    return this.questionRepository.save(entities);
  }

  async getQuestions(examId: string): Promise<QuestionEntity[]> {
    const exam = await this.examRepository.findOne({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    const questions = await this.questionRepository.find({
      where: { examId },
      order: { order: 'ASC' },
    });

    // Shuffle if needed and strip correct answers for students
    let result = questions;
    if (exam.shuffleQuestions) {
      result = [...questions].sort(() => Math.random() - 0.5);
    }

    // Limit to questionsPerExam
    result = result.slice(0, exam.questionsPerExam);

    // Strip correctOptionId for public endpoint
    return result.map((q) => {
      const { correctOptionId, explanation, explanationBn, ...rest } = q;
      return rest as QuestionEntity;
    });
  }

  async getQuestionsWithAnswers(examId: string): Promise<QuestionEntity[]> {
    return this.questionRepository.find({
      where: { examId },
      order: { order: 'ASC' },
    });
  }

  async updateQuestion(
    questionId: string,
    userId: string,
    dto: Partial<CreateQuestionDto>,
  ): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      relations: ['exam'],
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    await this.verifySiteOwnership(question.exam.siteId, userId);

    Object.assign(question, dto);
    return this.questionRepository.save(question);
  }

  async deleteQuestion(questionId: string, userId: string): Promise<void> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      relations: ['exam'],
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    await this.verifySiteOwnership(question.exam.siteId, userId);
    await this.questionRepository.remove(question);
  }
}
