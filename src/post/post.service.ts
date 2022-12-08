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

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
