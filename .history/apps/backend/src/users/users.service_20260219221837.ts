import { Injectable, ConflictException, NotFoundException,Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>,
    
  ) {}




  async findOneByEmail(email: string): Promise<User | null> {
  return this.userRepository.findOne({
    where: { email },
    select: ['id', 'email', 'password', 'role', 'first_name', 'last_name'], 
  });
}

  async create(userData: Partial<User>): Promise<User> {

    this.logger.log(`در حال ذخیره کاربر جدید در دیتابیس: ${userData.email}`);
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }



  async findAll() {
    consol
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAllMinimal() {
  // فقط آیدی و نام را می‌گیریم که حجم دیتا کم باشد
  return this.userRepository.find({
    select: ['id', 'first_name', 'last_name']
  });
}


async updateRole(id: number, role: UserRole) { // تغییر تایپ به UserRole
  const user = await this.userRepository.findOneBy({ id });
  
  if (!user) {
    throw new NotFoundException('کاربر پیدا نشد');
  }

  user.role = role; // حالا این خط دیگر ارور نمی‌دهد
  return await this.userRepository.save(user);
}

}