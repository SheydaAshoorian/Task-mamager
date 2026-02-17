import { IsNotEmpty,IsString,IsOptional, IsNumber, IsEnum } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../entities/task.entity';

export class CreateTaskDto {

    @ApiProperty()
    @IsString() 
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsEnum(TaskPriority, { message: 'اولویت باید یکی از مقادیر Low, Medium یا High باشد' })
    priority: TaskPriority;

    @ApiProperty()
    @IsEnum(TaskStatus, { message: 'وضعیت نامعتبر است' })
    status: TaskStatus;

    @ApiProperty()
    deadline: Date;

    
    @IsNumber({}, { message: 'شناسه کاربر باید عدد باشد' })
    assignedToId: number;
}