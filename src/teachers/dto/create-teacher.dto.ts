import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  IsArray,
  IsEmail,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Dr. Ahmed Khan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'ড. আহমেদ খান' })
  @IsOptional()
  @IsString()
  nameBn?: string;

  @ApiProperty({ example: 'Senior Lecturer' })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiPropertyOptional({ example: 'সিনিয়র প্রভাষক' })
  @IsOptional()
  @IsString()
  designationBn?: string;

  @ApiProperty({ example: 'Physics' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiPropertyOptional({ example: 'পদার্থবিজ্ঞান' })
  @IsOptional()
  @IsString()
  subjectBn?: string;

  @ApiPropertyOptional({ example: 'Experienced physics teacher with 10 years of teaching.' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'অভিজ্ঞ পদার্থবিজ্ঞান শিক্ষক।' })
  @IsOptional()
  @IsString()
  bioBn?: string;

  @ApiPropertyOptional({ example: 'https://example.com/photo.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'ahmed@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: ['MSc Physics', 'B.Ed'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  qualifications?: string[];

  @ApiPropertyOptional({ example: '10 years' })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
