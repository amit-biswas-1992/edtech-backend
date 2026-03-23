import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsUUID,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EnrollmentStatus,
  PaymentStatus,
} from '../../entities/enrollment.entity.js';

export class CreateEnrollmentDto {
  @ApiProperty({ example: 'Rafiq Ahmed' })
  @IsString()
  studentName: string;

  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  studentPhone: string;

  @ApiPropertyOptional({ example: '+8801898765432' })
  @IsOptional()
  @IsString()
  guardianPhone?: string;

  @ApiPropertyOptional({ example: 'rafiq@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'uuid-of-course' })
  @IsOptional()
  @IsUUID()
  courseId?: string;

  @ApiPropertyOptional({ example: 'Dhaka College' })
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiPropertyOptional({ example: '123456' })
  @IsOptional()
  @IsString()
  sscRoll?: string;

  @ApiPropertyOptional({ example: '654321' })
  @IsOptional()
  @IsString()
  hscRoll?: string;

  @ApiPropertyOptional({ example: 'BUET' })
  @IsOptional()
  @IsString()
  targetUniversity?: string;

  @ApiPropertyOptional({ example: 'Morning' })
  @IsOptional()
  @IsString()
  batchPreference?: string;

  @ApiPropertyOptional({ example: 'pending', enum: EnrollmentStatus })
  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;

  @ApiPropertyOptional({ example: 'unpaid', enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional({ example: 'bKash' })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'TXN123456' })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiPropertyOptional({ example: 15000.0 })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ example: 'Wants morning batch' })
  @IsOptional()
  @IsString()
  notes?: string;
}
