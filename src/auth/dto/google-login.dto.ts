import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginDto {
  @ApiProperty({ example: 'google-id-token-here' })
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
