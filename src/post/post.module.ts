import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostRespository } from './post.repository';
import { ProfileService } from 'src/profile/profile.service';
import { UsersService } from 'src/users/users.service';
import { ProfileRespository } from 'src/profile/profile.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostRespository,PostService,ProfileService,ProfileRespository,UsersService]
})
export class PostModule {}
