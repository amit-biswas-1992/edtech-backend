import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsEnum,
  IsObject,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PageType, BuilderType } from '../../entities/site-page.entity.js';

export class CreatePageDto {
  @ApiProperty({ example: 'landing' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Landing Page' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'ল্যান্ডিং পেজ' })
  @IsOptional()
  @IsString()
  titleBn?: string;

  @ApiPropertyOptional({ example: 'Main landing page of the site' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'landing', enum: PageType })
  @IsEnum(PageType)
  pageType: PageType;

  @ApiProperty({ example: 'sections', enum: BuilderType })
  @IsEnum(BuilderType)
  builderType: BuilderType;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isHomepage?: boolean;

  @ApiPropertyOptional({ example: {} })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}
