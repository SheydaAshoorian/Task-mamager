import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, adminId: number) {
    const { assignedToId, ...taskData } = createTaskDto;
    consol.log('hiiiiiii')
    // پیدا کردن کاربری که تسک بهش اساین شده
    const user = await this.userRepository.findOne({ where: { id: assignedToId } });
    consol.log()
    if (!user) {
      throw new NotFoundException('کاربری با این شناسه یافت نشد');
    }

    // ساخت تسک جدید
    const newTask = this.taskRepository.create({
      ...taskData,
      assignedTo: user,
      createdBy: { id: adminId } as User, // ذخیره ادمین سازنده
    });

    return await this.taskRepository.save(newTask);
  }

  // گرفتن همه تسک‌ها برای پنل ادمین
  async findAll() {
    return await this.taskRepository.find({
      relations: ['assignedTo'],
      order: { createdAt: 'DESC' },
    });
  }

  // در tasks.service.ts اضافه کن تا ارور کنترلر بره
findOne(id: number) { return `This action returns a #${id} task`; }
update(id: number, updateTaskDto: any) { return `updates #${id} task`; }
remove(id: number) { return `removes #${id} task`; }

}