import { IsNotEmpty,IsString,IsOptional } from 'typeorm'; 
import { ApiProperty } from '@nestjs/swagger';
import { Ta}

export class CreateTaskDto {

    @IsString() 
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;


    priority?: string;
    status?: string;
    deadline?: Date;
    assignedToId: number; // این خط رو حتماً اضافه کن
}