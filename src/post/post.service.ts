import { Injectable } from '@nestjs/common';
import { Post } from '../post/entities/post.entity';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRespository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly post: PostRespository,
    private readonly profile: ProfileService
    ){}
  async create(createPostDto: CreatePostDto) {
   await this.profile.findOne(createPostDto.profileId)
   try {
    const post: Post= {...createPostDto, id: randomUUID()}
    return await this.post.creatPost(post)
   } catch (error) {
    
   }
  }

 async findAll() {
   try {
    return await this.post.findAllPost()
   } catch (error) {
    
   }
  }

  async findOne(id: string) {
    try {
      const postfinded= await this.post.findOnePost(id)
      return  postfinded
    } catch (error) {
      
    }
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const data: Partial<Post> = {...updatePostDto}
      return this.prisma.post.update({
        where: { id },
        data,
      });
    } catch (error) {
      
    };
  }

 async remove(id: string) {
   try {
    await this.prisma.post.delete({ where: { id}})
    return `post '${id}' deletado com sucesso!`;
   } catch (error) {
    
   }
  }
}
