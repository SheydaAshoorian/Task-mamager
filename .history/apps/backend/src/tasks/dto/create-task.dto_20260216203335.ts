import { IsNotEmpty,IsString } from 'typeorm'; 
import { ApiProperty }

export class CreateTaskDto {

  title: string;
  description?: string;
  priority?: string;
  status?: string;
  deadline?: Date;
  assignedToId: number; // این خط رو حتماً اضافه کن
}