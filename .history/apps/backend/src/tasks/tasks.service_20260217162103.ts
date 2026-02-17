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

  const user = await this.userRepository.findOne({ where: { id: assignedToId } });
  if (!user) {
    throw new NotFoundException('کاربری با این شناسه یافت نشد');
  }

  const newTask = this.taskRepository.create({
    ...taskData,
    assignedToId: assignedToId, 
    createdById: adminId,       
  });

  return await this.taskRepository.save(newTask);
}
  

async findAll() {
  return await this.taskRepository.find({
    relations: ['assignedTo'], // این خط باعث می‌شود اطلاعات یوزر هم بیاید
    order: { createdAt: 'DESC' }, // جدیدترین‌ها اول باشند
  });
}

 
  
findOne(id: number) { return `This action returns a #${id} task`; }
update(id: number, updateTaskDto: any) { return `updates #${id} task`; }
remove(id: number) { return `removes #${id} task`; }

}