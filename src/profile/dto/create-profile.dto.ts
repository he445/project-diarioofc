import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  userId: string;
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  profilePicture: string = 'img.com';
}
