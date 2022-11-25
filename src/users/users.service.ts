import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';


@Injectable()
export class UsersService {
constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateUserDto) {
   const data: Users= {...dto}
   return this.prisma.user.create({
    data
  });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
   return this.prisma.user.findUnique({where: {id}})
  }

  update(id: string, dto: UpdateUserDto) {
    const data: Partial<Users>= {...dto}
    return this.prisma.user.update({
      where: {id},
      data
    });
  }

  async remove(id:string) {
    await this.prisma.user.delete({ where: { id } });;
  }
}
