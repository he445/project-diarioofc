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
import { isTheOwner } from 'src/auth/decorators/isTheOwner.decorator';

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
  
  findAll(@isAdmin() user: Users) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@isTheOwner () owner: Users, @Param('id') id: string) {
    if (owner.id !== id && owner.role !== 'admin' ) {
    
      throw new UnauthorizedException(
        'user not have permission to access this route',
      );
    }
    console.log(owner.id,id,owner.role)
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(
    @isTheOwner () owner: Users,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (owner.id !== id && owner.role !== 'admin' ) {
    
      throw new UnauthorizedException(
        'user not have permission to access this route',
      );
    }
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  remove(@isTheOwner () owner: Users, @Param('id') id: string) {
    if (owner.id !== id && owner.role !== 'admin' ) {
    
      throw new UnauthorizedException(
        'user not have permission to access this route',
      );
    }
    return this.usersService.remove(id)
  }
}
