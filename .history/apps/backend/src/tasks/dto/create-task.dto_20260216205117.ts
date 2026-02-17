import { IsNotEmpty,IsString } from 'typeorm'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {

    @IsString() 
    @IsNotEmpty()
    title: string;

    @IsString()
    @
    description?: string;


    priority?: string;
    status?: string;
    deadline?: Date;
    assignedToId: number; // این خط رو حتماً اضافه کن
}