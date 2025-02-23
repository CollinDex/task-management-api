import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async createTask(
    createTaskDto: CreateTaskDto,
  ): Promise<{ message: string; data: Task }> {
    try {
      const task = this.taskRepository.create({
        ...createTaskDto,
        status: TaskStatus.PENDING,
      });
      await this.em.flush();
      const responseData = {
        message: 'Task created successfully',
        data: task,
      };
      return responseData;
    } catch (error) {
      throw new InternalServerErrorException(
        `Internal server error: ${error.message}`,
      );
    }
  }

  async getTasks(
    status?: TaskStatus,
  ): Promise<{ message: string; data: Task[] }> {
    try {
      const filters = status ? { status } : {};
      const task = await this.taskRepository.find(filters);
      if (task.length === 0) {
        throw new NotFoundException('Task not found');
      }
      const responseData = {
        message: 'Task fetched Successfully',
        data: task,
      };
      return responseData;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Internal server error: ${error.message}`,
      );
    }
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<{ message: string; data: Task }> {
    try {
      const task = await this.taskRepository.findOne(id);
      if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
      task.status = updateTaskDto.status;
      await this.em.flush();
      const responseData = {
        message: 'Task status successfully updated',
        data: task,
      };
      return responseData;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Internal server error: ${error.message}`,
      );
    }
  }

  async deleteTask(id: number): Promise<{ message: string }> {
    try {
      const task = await this.taskRepository.findOne(id);
      if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
      await this.em.removeAndFlush(task);
      const responseData = {
        message: 'Task successfully deleted',
      };
      return responseData;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Internal server error: ${error.message}`,
      );
    }
  }
}
