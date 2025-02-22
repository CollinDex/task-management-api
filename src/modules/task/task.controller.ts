import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './enums/task.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Task } from './entities/task.entitiy';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: Task,
  })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks with optional filtering by status' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter tasks by status (e.g., PENDING, ACTIVE, COMPLETED)',
    enum: TaskStatus,
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: [Task], // Ensure Swagger knows the return type
  })
  async getTasks(@Query('status') status?: TaskStatus): Promise<Task[]> {
    return this.tasksService.getTasks(status);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({ status: 200, description: 'Task status updated', type: Task })
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
