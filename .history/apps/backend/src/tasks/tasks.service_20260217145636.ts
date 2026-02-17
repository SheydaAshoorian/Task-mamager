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

  // ۱. چک کردن وجود کاربر (اختیاری اما خوبه)
  const user = await this.userRepository.findOne({ where: { id: assignedToId } });
  if (!user) {
    throw new NotFoundException('کاربری با این شناسه یافت نشد');
  }

  // ۲. ساخت تسک فقط با استفاده از IDها
  const newTask = this.taskRepository.create({
    ...taskData,
    assignedToId: assignedToId, // فقط عدد بده
    createdById: adminId,       // فقط عدد بده
  });

  return await this.taskRepository.save(newTask);
}
  // گرفتن همه تسک‌ها برای پنل ادمین
  async findAll() {
    return await this.taskRepository.find({
      relations: ['assignedToId'],
      order: { createdAt: 'DESC' },
    });
  }

  // در tasks.service.ts اضافه کن تا ارور کنترلر بره
findOne(id: number) { return `This action returns a #${id} task`; }
update(id: number, updateTaskDto: any) { return `updates #${id} task`; }
remove(id: number) { return `removes #${id} task`; }

}