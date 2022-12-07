import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRespository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly profileRepository: ProfileRespository,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    await this.userService.findById(createProfileDto.userId)
    try {
      const profile: Profile ={...createProfileDto, id: randomUUID() }
      return await this.profileRepository.creatProfile(profile)
    } catch (error) {
      
    }
  }

  async findAll() {
    try {
      return await this.profileRepository.findAllProfile()
    } catch (error) {
      
    }
  }

  async findOne(id: string) {
   try {
    const profileFinded= await this.profileRepository.findOneProfile(id)
    return profileFinded
   } catch (error) {
    
   }
  }

 async update(id: string, updateProfileDto: UpdateProfileDto) {
   try {
      const data: Partial<Profile> = {...updateProfileDto}
      return this.prisma.profile.update({
        where: { id },
        data,
      });
    } catch (error) {
      
    }
  }

  async remove(id: string) {
  try {
    await this.prisma.profile.delete({ where: { id} });
      return `perfil '${id}' deletado com sucesso!`;
  } catch (error) {
    
  }
  }
}
