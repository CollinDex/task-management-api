import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task.enum';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Task {
  @ApiProperty({ example: 1, description: 'Task ID' })
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @ApiProperty({
    example: 'Run Tests',
    description: 'Task Title',
  })
  @Property()
  title!: string;

  @ApiProperty({
    example: 'Complete NestJS project',
    description: 'Task description',
  })
  @Property()
  description!: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    description: 'Task status',
  })
  @Property({ default: TaskStatus.PENDING })
  status!: TaskStatus;

  @ApiProperty({
    example: '2025-02-22T12:00:00.000Z',
    description: 'Creation date',
  })
  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @ApiProperty({
    example: '2025-02-22T12:00:00.000Z',
    description: 'Last update date',
  })
  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
