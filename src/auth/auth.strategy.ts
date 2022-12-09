import { Injectable, UnauthorizedException,CanActivate, ExecutionContext } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email},
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não existe ou não está autenticado',
      );
    }

    delete user.password;

    return user;
  }
 
canActivate(context: ExecutionContext): boolean {
        const httpRequest = context.switchToHttp().getRequest();
    
        const userData = httpRequest.user;
    
        if (userData?.role === 'admin') {
          return true;
        }
    
        throw new UnauthorizedException(
          'user not have permission to access this route',
        );
      }
  }


