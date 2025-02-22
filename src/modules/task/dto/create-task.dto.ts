import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Run Tests',
    description: 'Task Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Complete NestJS project',
    description: 'Task description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
