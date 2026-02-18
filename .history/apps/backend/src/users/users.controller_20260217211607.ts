import { Controller, Get, Post, Body, Patch, Param, Delete, Body, ParseIntPipe  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation }  from '@nestjs/swagger';

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

 
@Patch(':id') // آدرس می‌شود: /users/123
updateRole(
  @Param('id', ParseIntPipe) id: number, 
  @Body('role') role: string
) {
  return this.usersService.updateRole(id, role);
}
}
