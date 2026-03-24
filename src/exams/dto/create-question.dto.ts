import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { QuestionDifficulty } from '../../entities/question.entity.js';

class QuestionOptionDto {
  @ApiProperty({ example: 'opt_1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Newton\'s First Law' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: 'নিউটনের প্রথম সূত্র' })
  @IsOptional()
  @IsString()
  textBn?: string;

  @ApiPropertyOptional({ example: 'https://example.com/option-image.jpg' })
  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'What is Newton\'s First Law?' })
  @IsString()
  questionText: string;

  @ApiPropertyOptional({ example: 'নিউটনের প্রথম সূত্র কী?' })
  @IsOptional()
  @IsString()
  questionTextBn?: string;

  @ApiPropertyOptional({ example: 'https://example.com/question-image.jpg' })
  @IsOptional()
  @IsString()
  questionImage?: string;

  @ApiProperty({
    example: [
      { id: 'opt_1', text: 'An object at rest stays at rest' },
      { id: 'opt_2', text: 'Force equals mass times acceleration' },
    ],
    type: [QuestionOptionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options: QuestionOptionDto[];

  @ApiProperty({ example: 'opt_1' })
  @IsString()
  correctOptionId: string;

  @ApiPropertyOptional({ example: 'Newton\'s first law states that...' })
  @IsOptional()
  @IsString()
  explanation?: string;

  @ApiPropertyOptional({ example: 'নিউটনের প্রথম সূত্র বলে...' })
  @IsOptional()
  @IsString()
  explanationBn?: string;

  @ApiPropertyOptional({ example: 'Physics' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional({ example: 'Mechanics' })
  @IsOptional()
  @IsString()
  chapter?: string;

  @ApiPropertyOptional({ example: 'medium', enum: QuestionDifficulty })
  @IsOptional()
  @IsEnum(QuestionDifficulty)
  difficulty?: QuestionDifficulty;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  marks?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
