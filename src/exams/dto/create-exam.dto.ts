import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsEnum,
  IsNumber,
  IsDateString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExamType } from '../../entities/exam.entity.js';

export class CreateExamDto {
  @ApiProperty({ example: 'Physics Final Exam' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'পদার্থবিজ্ঞান চূড়ান্ত পরীক্ষা' })
  @IsOptional()
  @IsString()
  titleBn?: string;

  @ApiPropertyOptional({ example: 'Comprehensive physics exam covering all chapters' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'live', enum: ExamType })
  @IsEnum(ExamType)
  type: ExamType;

  @ApiProperty({ example: 60 })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  totalMarks?: number;

  @ApiPropertyOptional({ example: 40 })
  @IsOptional()
  @IsInt()
  @Min(0)
  passMarks?: number;

  @ApiPropertyOptional({ example: 0.25 })
  @IsOptional()
  @IsNumber()
  negativeMarking?: number;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  questionsPerExam?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  shuffleQuestions?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  showResult?: boolean;

  @ApiPropertyOptional({ example: '2026-04-01T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @ApiPropertyOptional({ example: '2026-04-01T11:00:00Z' })
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxAttempts?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'uuid-of-course' })
  @IsOptional()
  @IsUUID()
  courseId?: string;
}
