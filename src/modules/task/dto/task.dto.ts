import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEnum } from 'class-validator'

export class CreateTaskInput {
  @ApiProperty()
  @IsString()
  name: string
  
  @ApiProperty()
  @IsString()
  categoryId: string
}

export class TaskIdInput {
  @ApiProperty()
  @IsString()
  taskId: string
}

export class UpdateTaskInput {
  @ApiProperty()
  @IsString()
  taskId: string

  @ApiProperty()
  @IsString()
  name: string
}
