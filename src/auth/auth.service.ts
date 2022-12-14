import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginResponse } from './dto/login-response.dto';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  
  constructor(private readonly prisma: PrismaService,
    private readonly  jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<loginResponse> {
    const { email, password } = loginDto;


    const user = await this.prisma.user.findUnique({ where: { email} });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email}),
      user,
    };
  }
  
}