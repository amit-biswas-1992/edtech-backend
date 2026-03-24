import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExamsService } from './exams.service.js';
import { CreateExamDto } from './dto/create-exam.dto.js';
import { UpdateExamDto } from './dto/update-exam.dto.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';

@ApiTags('Exams')
@Controller('sites/:siteId/exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new exam' })
  @ApiResponse({ status: 201, description: 'Exam created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateExamDto,
  ) {
    return this.examsService.create(siteId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exams for a site' })
  @ApiResponse({ status: 200, description: 'List of exams' })
  async findBySiteId(@Param('siteId') siteId: string) {
    return this.examsService.findBySiteId(siteId);
  }

  @Get(':examId')
  @ApiOperation({ summary: 'Get an exam by ID' })
  @ApiResponse({ status: 200, description: 'Exam details' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  async findById(@Param('examId') examId: string) {
    return this.examsService.findById(examId);
  }

  @Patch(':examId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an exam' })
  @ApiResponse({ status: 200, description: 'Exam updated successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('examId') examId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateExamDto,
  ) {
    return this.examsService.update(examId, user.id, dto);
  }

  @Delete(':examId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an exam' })
  @ApiResponse({ status: 200, description: 'Exam deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('examId') examId: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.examsService.delete(examId, user.id);
    return { message: 'Exam deleted successfully' };
  }

  @Post(':examId/questions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk add questions to an exam' })
  @ApiResponse({ status: 201, description: 'Questions added successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async bulkAddQuestions(
    @Param('examId') examId: string,
    @CurrentUser() user: UserEntity,
    @Body() questions: CreateQuestionDto[],
  ) {
    return this.examsService.bulkAddQuestions(examId, user.id, questions);
  }

  @Get(':examId/questions')
  @ApiOperation({ summary: 'Get questions for an exam (shuffled, without correct answers)' })
  @ApiResponse({ status: 200, description: 'List of questions' })
  async getQuestions(@Param('examId') examId: string) {
    return this.examsService.getQuestions(examId);
  }

  @Put(':examId/questions/:questionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a question' })
  @ApiResponse({ status: 200, description: 'Question updated successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updateQuestion(
    @Param('questionId') questionId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.examsService.updateQuestion(questionId, user.id, dto);
  }

  @Delete(':examId/questions/:questionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteQuestion(
    @Param('questionId') questionId: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.examsService.deleteQuestion(questionId, user.id);
    return { message: 'Question deleted successfully' };
  }
}
