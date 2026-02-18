import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>,
    
  ) {}


    async findOneByEmail(email: string): Promise<User | null> {
     return await this.userRepository.findOne({ where: { email }, select: ['id', 'name', 'family', 'email', 'password', 'role'] });
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


  // در فایل users.service.ts
async updateRole(id: number, role: string) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user) {
    throw new NotFoundException('کاربر پیدا نشد');
  }
  user.role = role;
  return await this.userRepository.save(user);
}

}