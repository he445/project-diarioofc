import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile } from '../profile/entities/profile.entity';
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
}
