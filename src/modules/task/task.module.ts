import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task.entitiy';

@Module({
  imports: [MikroOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
