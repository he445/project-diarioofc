import { Injectable } from '@nestjs/common';
import { profile } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile } from '../profile/entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
@Injectable()
export class ProfileRespository {
  constructor(private readonly prismaService: PrismaService) {}
  async creatProfile({ id, userId, name, profilePicture }: Profile) {
    return await this.prismaService.profile.create({
      data: {
        id: id,
        userId: userId,
        name: name,
        profilePicture: profilePicture,
      },
    include: { User: true}
    });
  }
  async findAllProfile(){
    return await this.prismaService.profile.findMany()
  }

  async findAllProfilebyUser(userId:string){
    return await this.prismaService.profile.findMany({
      where: {userId:userId},
      include:{User: true}})
    
  }

  async findOneProfile(id:string){
    return await this.prismaService.profile.findUnique({where:{id:id},
    include:{User: true}})
        
    }
  }
  
  

