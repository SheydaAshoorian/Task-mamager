import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation }  from '@nestjs/swagger';
import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  @ApiOperation( { summary: 'ثبت نام کاربر'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

 
  @Patch(':id') 
  updateRole(
    @Param('id', ParseIntPipe) id: number, 
    @Body('role') role: UserRole
  ) {
    return this.usersService.updateRole(id, role);
  }
}
