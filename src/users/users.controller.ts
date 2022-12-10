import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { isAdmin } from 'src/auth/decorators/isAdmsin.decorator';
import { Users } from './entities/user.entity';
import { isTheUser } from 'src/auth/decorators/isTheUser.decorator';
import { ParameterLocation, ParameterObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(@isAdmin() user:Users) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
 
  findOne(@isTheUser() user:Users, @Param('id') id: string) {
    if(user.id!== id){ throw new UnauthorizedException(
      'user not have permission to access this route',
    );}
  return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@isTheUser() user:Users,@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if(user.id!== id){ throw new UnauthorizedException(
      'user not have permission to access this route',
    );}
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  remove(@isTheUser() user:Users,@Param('id') id: string) {
    if(user.id!== id){ throw new UnauthorizedException(
      'user not have permission to access this route',
    );}
    return this.usersService.remove(id);
  }
}
