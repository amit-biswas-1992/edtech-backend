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
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PromoType } from '../../entities/promo.entity.js';

export class CreatePromoDto {
  @ApiProperty({ example: 'SUMMER2026' })
  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.toUpperCase() : value)
  code: string;

  @ApiProperty({ example: 'percentage', enum: PromoType })
  @IsEnum(PromoType)
  type: PromoType;

  @ApiProperty({ example: 15.0 })
  @IsNumber()
  value: number;

  @ApiPropertyOptional({ example: 5000.0 })
  @IsOptional()
  @IsNumber()
  minPurchase?: number;

  @ApiPropertyOptional({ example: 2000.0 })
  @IsOptional()
  @IsNumber()
  maxDiscount?: number;

  @ApiPropertyOptional({ example: 'Summer discount on all courses' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'সব কোর্সে গ্রীষ্মকালীন ছাড়' })
  @IsOptional()
  @IsString()
  descriptionBn?: string;

  @ApiProperty({ example: '2026-06-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-08-31' })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  usageLimit?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  usedCount?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: ['uuid-course-1', 'uuid-course-2'] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  applicableCourseIds?: string[];
}
