import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/task.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    example: TaskStatus.PENDING,
    description: 'Task Status',
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus, {
    message:
      'Status must be one of the following: PENDING, IN_PROGRESS, COMPLETED',
  })
  status!: TaskStatus;
}
