import { Global, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Global()
@Module({
  imports: [PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
