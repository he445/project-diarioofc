import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileRespository } from './profile.repository';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfileController],
  providers: [ProfileRespository,ProfileService, UsersService]
})
export class ProfileModule {}
