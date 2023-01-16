import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostRespository } from './post.repository';

import { UsersService } from 'src/users/users.service';

import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PostController],
  providers: [PostRespository,UsersService, PostService]
})
export class PostModule {}
