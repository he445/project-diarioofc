import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  profileId: string;
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  body: string;
}
