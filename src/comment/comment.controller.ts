import { Controller, Delete, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { isTheOwner } from 'src/auth/decorators/isTheOwner.decorator';
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto'
@ApiTags('comments')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('comments')
export class CommentController {
  constructor(private comment: CommentService) {}

  @Post()
  createComment(
    @isTheOwner('id') userId: string,
    postId: string,
    dto: CreateCommentDto,
  ) {
    return this.comment.createComment(userId, postId, dto)
  }

  @Delete(':commentId')
  deleteComment(@isTheOwner('id') userId: string, commentId: string) {
    return this.comment.deleteComment(userId, commentId)
  }
}
