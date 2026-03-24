import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExamAttemptsService } from './exam-attempts.service.js';
import { SubmitAttemptDto } from './dto/submit-attempt.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';

@ApiTags('Exam Attempts')
@Controller('sites/:siteId/exams/:examId')
export class ExamAttemptsController {
  constructor(private readonly examAttemptsService: ExamAttemptsService) {}

  @Post('start')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start an exam attempt' })
  @ApiResponse({ status: 201, description: 'Attempt started, returns questions without answers' })
  @ApiResponse({ status: 400, description: 'Cannot start attempt' })
  async startAttempt(
    @Param('siteId') siteId: string,
    @Param('examId') examId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.examAttemptsService.startAttempt(siteId, examId, user.id);
  }

  @Post('submit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit exam answers' })
  @ApiResponse({ status: 200, description: 'Attempt submitted and scored' })
  @ApiResponse({ status: 400, description: 'Invalid submission' })
  async submitAttempt(
    @Param('examId') examId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: SubmitAttemptDto,
  ) {
    return this.examAttemptsService.submitAttempt(examId, user.id, dto);
  }

  @Get('attempts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get student\'s own attempts for an exam' })
  @ApiResponse({ status: 200, description: 'List of attempts' })
  async getStudentAttempts(
    @Param('examId') examId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.examAttemptsService.getStudentAttempts(examId, user.id);
  }

  @Get('result/:attemptId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get detailed result for an attempt' })
  @ApiResponse({ status: 200, description: 'Attempt result with correct answers' })
  @ApiResponse({ status: 404, description: 'Attempt not found' })
  async getResult(
    @Param('attemptId') attemptId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.examAttemptsService.getResult(attemptId, user.id);
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get exam leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard sorted by score' })
  async getLeaderboard(@Param('examId') examId: string) {
    return this.examAttemptsService.getLeaderboard(examId);
  }
}
