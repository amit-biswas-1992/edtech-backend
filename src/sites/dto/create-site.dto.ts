import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ColorThemeDto {
  @ApiProperty({ example: '#4F46E5' })
  @IsString()
  primary: string;

  @ApiProperty({ example: '#7C3AED' })
  @IsString()
  secondary: string;

  @ApiProperty({ example: '#F59E0B' })
  @IsString()
  accent: string;

  @ApiProperty({ example: '#FFFFFF' })
  @IsString()
  background: string;

  @ApiProperty({ example: '#1F2937' })
  @IsString()
  text: string;

  @ApiProperty({ example: 'Indigo' })
  @IsString()
  name: string;
}

export class CreateSiteDto {
  @ApiProperty({ example: 'My Academy' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'uuid-of-template' })
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @ApiPropertyOptional({ type: ColorThemeDto })
  @IsOptional()
  @IsObject()
  colorTheme?: ColorThemeDto;
}
