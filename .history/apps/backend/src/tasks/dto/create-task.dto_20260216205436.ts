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

    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @TaskStatus()
    status: TaskStatus;
    deadline?: Date;
    assignedToId: number; // این خط رو حتماً اضافه کن
}