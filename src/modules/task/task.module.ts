import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'modules/users/users.entity'
import { Tasks } from './task.entity'
import { TasksController } from './task.controller'
import { TaskService } from './task.service'
import { Categories } from '../category/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Categories, Tasks])
  ],
  controllers: [TasksController],
  providers: [TaskService],
})

export class TaskModule {}
