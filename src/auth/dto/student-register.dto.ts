import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentRegisterDto {
  @ApiProperty({ example: 'Student Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

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
  @Length(5, 5, { message: 'PIN must be exactly 5 digits' })
  @Matches(/^[0-9]{5}$/, { message: 'PIN must contain only digits' })
  pin: string;

  @ApiProperty({ example: 'uuid-of-site' })
  @IsUUID()
  siteId: string;
}
