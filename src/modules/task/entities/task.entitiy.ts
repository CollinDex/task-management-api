import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from 'src/modules/task/enums/task.enum';

@Entity()
export class Task {
  @ApiProperty({ example: 1, description: 'Task ID' })
  @PrimaryKey()
  id!: number;

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
