import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Users } from 'src/users/entities/user.entity';
import { isAdmin } from 'src/auth/decorators/isAdmsin.decorator';
import { isTheOwner } from 'src/auth/decorators/isTheOwner.decorator';
import { Profile } from './entities/profile.entity';
import { isTheProfile } from 'src/auth/decorators/isTheProfile.decorator';
@ApiTags('profile')
@UseGuards(AuthGuard())
  @ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@isTheOwner () owner: Users, @Body() createProfileDto: CreateProfileDto) {
    if (owner.id !== createProfileDto.userId && owner.role !== 'admin' ) {
     throw new UnauthorizedException(
        'user not have permission to access this route',
      );
    }
    return this.profileService.create(createProfileDto);
  }
    
    
  @Get()
  findAll(@isAdmin() user: Users ) {
    return this.profileService.findAll();
  }

  @Get(':userId')
  findAllbyUser(@isTheOwner ()owner:Users,@Param('userId')userId: string) {
    if (owner.id !== userId && owner.role !== 'admin' ) {
      console.log(owner.id,userId,owner.role)
      throw new UnauthorizedException(
        'user not have permission to access this route',
      );
    }
    return this.profileService.findAllbyUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string ) {
    
   
    return this.profileService.remove(id);
  }
}
