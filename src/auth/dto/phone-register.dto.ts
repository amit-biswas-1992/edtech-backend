import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneRegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number format' })
  phone: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @Length(5, 5, { message: 'PIN must be exactly 5 digits' })
  @Matches(/^[0-9]{5}$/, { message: 'PIN must contain only digits' })
  pin: string;
}
