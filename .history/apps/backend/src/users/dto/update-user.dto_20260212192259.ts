import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
