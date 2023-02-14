import { Injectable } from '@nestjs/common';
import { Post } from '../post/entities/post.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { prisma } from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostRespository {
  constructor(private readonly prismaService: PrismaService) {}
  async creatPost({ id,authorId, title, content}: Post) {
    return await this.prismaService.post.create({
      data: { id: id, authorId:authorId, title: title, content: content },
      include: {author: true}
    });
  }
  async updatePost (id:string, {authorId, title, content}:UpdatePostDto){
    return await this.prismaService.post.update({
      where: { id:id },
      data:{authorId:authorId, title: title, content: content}
    });
  }
  async findAllPost(){
    return await this.prismaService.post.findMany()
}
async findOnePost(id:string){
    return await this.prismaService.post.findUnique({where:{id:id},
    include:{author: true}})}
 
}
