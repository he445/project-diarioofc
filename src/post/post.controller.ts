import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/users/entities/user.entity';
import { isTheOwner } from 'src/auth/decorators/isTheOwner.decorator';

@ApiTags('post')
@UseGuards(AuthGuard())
  @ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
   
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update( @isTheOwner () owner: Users,@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    console.log("eita", owner.id,updatePostDto.profileId )
    if(owner.id != updatePostDto.profileId){
      throw new UnauthorizedException(
        'user not have permission to access this route',
      );
      }
    
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove( @Param('id') id: string) {
    
    return this.postService.remove(id);
  }
}
