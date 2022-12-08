import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    try {
      const data: Users = { ...dto, id: randomUUID() };
      const hashedPassword = await hash(dto.password, 10);
      data.password= hashedPassword
      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      this.errorHandeling(error);
    }
  }

  findAll() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      this.errorHandeling(error);
    }
  }

  async findOne(id: string) {
    try {
      return this.findById(id);
    } catch (error) {
      this.errorHandeling(error);
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    try {
      const data: Partial<Users> = { ...dto };
      return this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.errorHandeling(error);
    }
  }

  async remove(id: string) {
    await this.findById(id);
    try {
      await this.prisma.user.delete({ where: { id } });
      return `usuario '${id}' deletado com sucesso!`;
    } catch (error) {
      this.errorHandeling(error);
    }
  }

  errorHandeling(error: Error) {
    const errorMensage = new PrismaClient({
      errorFormat: 'pretty',
    });
    throw errorMensage || 'algum erro aconteceu, desculpe';
  }
  async findById(id: string) {
    const record = await this.prisma.user.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`O id '${id}' não foiencontrado`);
    }
    return record;
  }
}
