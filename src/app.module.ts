import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule,PostModule,CommentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
