import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional, IsString, Matches } from 'class-validator';
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

  @ApiPropertyOptional({
    example: {
      whatsappNumber: '+8801700000000',
      whatsappMessage: 'Hi, I want to know about your admission programs',
      messengerPageId: 'your-facebook-page-id',
      showWhatsapp: true,
      showMessenger: false,
    },
  })
  @IsOptional()
  @IsObject()
  chatConfig?: Record<string, any>;

  @ApiPropertyOptional({ example: 'light' })
  @IsOptional()
  @IsString()
  themeMode?: string;

  @ApiPropertyOptional({ example: 'bn' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  fontConfig?: Record<string, any>;
}
