import { IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneLoginDto {
  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number format' })
  phone: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @Length(5, 5)
  @Matches(/^[0-9]{5}$/)
  pin: string;
}
