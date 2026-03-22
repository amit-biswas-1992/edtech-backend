import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ValidatePromoDto {
  @ApiProperty({ example: 'SUMMER2026' })
  @IsString()
  code: string;

  @ApiPropertyOptional({ example: 'uuid-of-course' })
  @IsOptional()
  @IsUUID()
  courseId?: string;
}
