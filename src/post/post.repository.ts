import { Injectable } from '@nestjs/common';
import { Post } from '../post/entities/post.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { prisma } from '@prisma/client';

@Injectable()
export class PostRespository {
  constructor(private readonly prismaService: PrismaService) {}
  async creatPost({ id, profileId, title, body }: Post) {
    return await this.prismaService.post.create({
      data: { id: id, profileId: profileId, title: title, body: body },
      include: {Profile: true}
    });
  }
  async findAllPost(){
    return await this.prismaService.post.findMany()
}
async findOnePost(id:string){
    return await this.prismaService.post.findUnique({where:{id:id},
    include:{Profile: true}})}
 
}
