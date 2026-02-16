import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  TypeOrmModule.forFeature([Task])
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
