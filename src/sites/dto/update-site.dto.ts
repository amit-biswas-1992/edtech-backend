import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSiteDto } from './create-site.dto.js';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @ApiPropertyOptional({ example: 'My Academy - Best Coaching Center' })
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @ApiPropertyOptional({
    example: 'Best admission coaching center in Bangladesh',
  })
  @IsOptional()
  @IsString()
  seoDescription?: string;

  @ApiPropertyOptional({ example: 'coaching, admission, bangladesh, education' })
  @IsOptional()
  @IsString()
  seoKeywords?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ example: 'https://example.com/favicon.ico' })
  @IsOptional()
  @IsString()
  favicon?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: 'my-academy' })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, {
    message: 'Subdomain must be lowercase alphanumeric with hyphens',
  })
  subdomain?: string;
}
