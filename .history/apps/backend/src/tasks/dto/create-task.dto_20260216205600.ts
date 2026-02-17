import { IsNotEmpty,IsString,IsOptional } from 'typeorm'; 
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../entities/task.entity';

export class CreateTaskDto {

    @IsString() 
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

@IsEnum(TaskPriority, { message: 'اولویت باید یکی از مقادیر Low, Medium یا High باشد' })    priority: TaskPriority;

    @TaskStatus()
    status: TaskStatus;

    deadline: Date;

    @IsNumber({}, { message: 'شناسه کاربر باید عدد باشد' })
    assignedToId: number;
}