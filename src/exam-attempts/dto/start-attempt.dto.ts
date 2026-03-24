import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class StartAttemptDto {
  @ApiPropertyOptional({ example: 'Some optional note' })
  @IsOptional()
  @IsString()
  note?: string;
}
