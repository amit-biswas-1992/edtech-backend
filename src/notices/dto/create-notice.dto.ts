import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NoticeType } from '../../entities/notice.entity.js';

export class CreateNoticeDto {
  @ApiProperty({ example: 'Admission Open for 2025' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: '২০২৫ এ ভর্তি চলছে' })
  @IsOptional()
  @IsString()
  titleBn?: string;

  @ApiProperty({ example: 'Admission is now open for all programs...' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 'সকল প্রোগ্রামে ভর্তি চলছে...' })
  @IsOptional()
  @IsString()
  contentBn?: string;

  @ApiPropertyOptional({ example: 'admission', enum: NoticeType })
  @IsOptional()
  @IsEnum(NoticeType)
  type?: NoticeType;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: '2026-04-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  publishDate?: string;

  @ApiPropertyOptional({ example: '2026-06-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}
