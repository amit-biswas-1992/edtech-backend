import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DayOfWeek } from '../../entities/schedule.entity.js';

export class CreateScheduleDto {
  @ApiProperty({ example: 'Physics Class' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'পদার্থবিজ্ঞান ক্লাস' })
  @IsOptional()
  @IsString()
  titleBn?: string;

  @ApiProperty({ example: 'saturday', enum: DayOfWeek })
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @ApiProperty({ example: '16:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '18:00' })
  @IsString()
  endTime: string;

  @ApiPropertyOptional({ example: 'uuid-of-course' })
  @IsOptional()
  @IsUUID()
  courseId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-teacher' })
  @IsOptional()
  @IsUUID()
  teacherId?: string;

  @ApiPropertyOptional({ example: 'Room 201' })
  @IsOptional()
  @IsString()
  room?: string;

  @ApiPropertyOptional({ example: 'https://meet.google.com/abc-defg-hij' })
  @IsOptional()
  @IsString()
  meetingLink?: string;

  @ApiPropertyOptional({ example: 'Batch A - Morning' })
  @IsOptional()
  @IsString()
  batchName?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
