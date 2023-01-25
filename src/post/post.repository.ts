import { Injectable } from '@nestjs/common';
import { Post } from '../post/entities/post.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { prisma } from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostRespository {
  constructor(private readonly prismaService: PrismaService) {}
  async creatPost({ id, profileId, title, content}: Post) {
    return await this.prismaService.post.create({
      data: { id: id, authorId: profileId, title: title, content: content },
      include: {author: true}
    });
  }
  async updatePost (id:string, { profileId, title, content}:UpdatePostDto){
    return await this.prismaService.post.update({
      where: { id:id },
      data:{authorId: profileId, title: title, content: content}
    });
  }
  async findAllPost(){
    return await this.prismaService.post.findMany()
}
async findOnePost(id:string){
    return await this.prismaService.post.findUnique({where:{id:id},
    include:{author: true}})}
 
}
