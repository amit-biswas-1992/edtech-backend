import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsEnum,
  IsNumber,
  IsArray,
  IsDateString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CourseCategory } from '../../entities/course.entity.js';

class SyllabusItemDto {
  @ApiProperty({ example: 'Introduction to Mechanics' })
  @IsString()
  topic: string;

  @ApiProperty({ example: 'Covers Newton\'s laws and basic mechanics' })
  @IsString()
  description: string;
}

export class CreateCourseDto {
  @ApiProperty({ example: 'Engineering Admission Crash Course' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'ইঞ্জিনিয়ারিং ভর্তি ক্র্যাশ কোর্স' })
  @IsOptional()
  @IsString()
  titleBn?: string;

  @ApiPropertyOptional({ example: 'Complete preparation for engineering admission tests.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'ইঞ্জিনিয়ারিং ভর্তি পরীক্ষার সম্পূর্ণ প্রস্তুতি।' })
  @IsOptional()
  @IsString()
  descriptionBn?: string;

  @ApiPropertyOptional({ example: '3 months' })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiPropertyOptional({ example: 15000.0 })
  @IsOptional()
  @IsNumber()
  fee?: number;

  @ApiPropertyOptional({ example: 'BDT' })
  @IsOptional()
  @IsString()
  feeCurrency?: string;

  @ApiProperty({ example: 'engineering', enum: CourseCategory })
  @IsEnum(CourseCategory)
  category: CourseCategory;

  @ApiPropertyOptional({ example: 'https://example.com/thumbnail.jpg' })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiPropertyOptional({
    example: [{ topic: 'Physics', description: 'Mechanics and Thermodynamics' }],
    type: [SyllabusItemDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyllabusItemDto)
  syllabus?: SyllabusItemDto[];

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalSeats?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  enrolledCount?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'Sun-Thu, 4:00 PM - 6:00 PM' })
  @IsOptional()
  @IsString()
  schedule?: string;

  @ApiPropertyOptional({ example: '2026-04-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-07-01' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 'uuid-of-teacher' })
  @IsOptional()
  @IsUUID()
  teacherId?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
