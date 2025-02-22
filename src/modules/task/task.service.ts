import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Task } from './entities/task.entitiy';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/task.enum';
import { EntityManager } from '@mikro-orm/mysql';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: EntityRepository<Task>,
    private readonly em: EntityManager,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      status: TaskStatus.PENDING,
    });
    await this.em.flush();
    return task;
  }

  async getTasks(status?: TaskStatus): Promise<Task[]> {
    const filters = status ? { status } : {};
    return this.taskRepository.find(filters);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    task.status = updateTaskDto.status;
    await this.em.flush();
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    await this.em.removeAndFlush(task);
  }
}
