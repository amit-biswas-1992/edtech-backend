import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateResultDto {
  @ApiProperty({ example: 'Rafiq Ahmed' })
  @IsString()
  studentName: string;

  @ApiPropertyOptional({ example: 'রফিক আহমেদ' })
  @IsOptional()
  @IsString()
  studentNameBn?: string;

  @ApiPropertyOptional({ example: 'https://example.com/photo.jpg' })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ example: 'BUET' })
  @IsString()
  university: string;

  @ApiPropertyOptional({ example: 'বুয়েট' })
  @IsOptional()
  @IsString()
  universityBn?: string;

  @ApiPropertyOptional({ example: 'CSE' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ example: 2025 })
  @IsInt()
  admissionYear: number;

  @ApiPropertyOptional({ example: 15 })
  @IsOptional()
  @IsInt()
  @Min(1)
  meritPosition?: number;

  @ApiPropertyOptional({ example: 'Batch 2024 - Engineering' })
  @IsOptional()
  @IsString()
  coachingBatch?: string;

  @ApiPropertyOptional({ example: 'Dhaka College' })
  @IsOptional()
  @IsString()
  previousInstitution?: string;

  @ApiPropertyOptional({ example: 'Great coaching experience!' })
  @IsOptional()
  @IsString()
  testimonial?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
