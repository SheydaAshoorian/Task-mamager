import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>,
    
  ) {}


    async findOneByEmail(email: string): Promise<User | null> {
     return await this.userRepository.findOne({ where: { email }, select: ['id', 'first_name', 'family', 'email', 'password', 'role'] });
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...rest } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    
    if (existingUser) {
      throw new ConflictException('این ایمیل قبلاً ثبت شده است');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      ...rest,
      email,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
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