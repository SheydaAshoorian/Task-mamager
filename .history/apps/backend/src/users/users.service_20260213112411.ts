import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}

//   async create(createUserDto: CreateUserDto) {
//     const { email, password, ...rest } = createUserDto;

//     // ۱. چک کردن تکراری نبودن ایمیل (مثل پایتون که ارور Integrity می‌داد)
//     const existingUser = await this.userRepository.findOne({ where: { email } });
//     if (existingUser) {
//       throw new ConflictException('این ایمیل قبلاً ثبت شده است');
//     }

//     // ۲. هش کردن پسورد
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // ۳. ساخت نمونه یوزر (کد پرسنلی خودکار ساخته می‌شود)
//     const newUser = this.userRepository.create({
//       ...rest,
//       email,
//       password: hashedPassword,
//     });

//     // ۴. ذخیره در دیتابیس
//     return await this.userRepository.save(newUser);
//   }

//   async findAll() {
//     return await this.userRepository.find();
//   }

//   async findOne(id: number) {
//     return await this.userRepository.findOne({ where: { id } });
//   }
// }
@Injectable()
export class UsersService {

  constructor( 
    @InjectRepository(User) 
    private userRepository: Repository<User>,
  ) {}
//     const { email, password, ...rest } = createUserDto;

//     // ۱. چک کردن تکراری نبودن ایمیل (مثل پایتون که ارور Integrity می‌داد)
//     const existingUser = await this.userRepository.findOne({ where: { email } });
//     if (existingUser) {
//       throw new ConflictException('این ایمیل قبلاً ثبت شده است');
//     }
//     // ۲. هش کردن پسورد
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

  const { email, password , ...rest } = createUserDto;

  const existingUser =  await this.userRepository.findOne({ where: { email } });

   if (existingUser {

       throw new ConflictException (' این ایمیل قبلاً ثبت شده است');
   })
  
   const salt = await bcrypt.genSalt();
   const hashedPassword = await 
 

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
