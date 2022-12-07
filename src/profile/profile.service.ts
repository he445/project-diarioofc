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
      await this.profileRepository.creatProfile(profile)
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
