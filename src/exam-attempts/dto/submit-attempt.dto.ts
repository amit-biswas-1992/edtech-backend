import {
  IsArray,
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
  ValidateNested,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class AnswerDto {
  @ApiProperty({ example: 'uuid-of-question' })
  @IsUUID()
  questionId: string;

  @ApiPropertyOptional({ example: 'opt_1' })
  @IsOptional()
  @IsString()
  selectedOptionId: string | null;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  @Min(0)
  timeTaken?: number;
}

export class SubmitAttemptDto {
  @ApiProperty({ example: 'uuid-of-attempt' })
  @IsUUID()
  attemptId: string;

  @ApiProperty({
    example: [
      { questionId: 'uuid', selectedOptionId: 'opt_1', timeTaken: 30 },
    ],
    type: [AnswerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
