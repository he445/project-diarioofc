import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
 @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}