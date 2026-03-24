import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentLoginDto {
  @ApiPropertyOptional({ example: 'student@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '+8801700000000' })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number format' })
  phone?: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @Length(5, 5)
  @Matches(/^[0-9]{5}$/)
  pin: string;

  @ApiProperty({ example: 'uuid-of-site' })
  @IsUUID()
  siteId: string;
}
