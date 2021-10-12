import { Task } from './interfaces/task.interfaces'
import { CreateTaskInput, TaskIdInput, UpdateTaskInput } from './dto/task.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
import { Tasks } from './task.entity'
import { Users } from '../users/users.entity'
import { Categories } from '../category/category.entity'
import { getTaskInfoBy, getUserTasks } from './task.repository'
import { GetTaskInfo, MessageResponse } from './interfaces/task.response'


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Categories) private categoryRepository: Repository<Categories>,
        @InjectRepository(Tasks) private taskRepository: Repository<Tasks>
    ) {}

    async createTask(author: string, { name, categoryId }: CreateTaskInput): Promise<MessageResponse> {
        // Check if the user exist in the db
        const user = await this.usersRepository.findOne({ id: author })
        if (!user) throw new BadRequestException('User not found')

        // Check if the category exist in the db
        const category = await this.categoryRepository.findOne({ id: categoryId, userId: author })
        if (!category) throw new BadRequestException('Category not found')

        const newUuid = uuid()
        const taskObj: Task = {
            id: newUuid,
            name,
            categoryId,
            userId: author
        }

        // Insert task
        await this.taskRepository.insert(taskObj)
        return { status: 200, message: 'successful' }
    }

    async checkTask(author: string, taskId: string) {
        const task = await getTaskInfoBy(taskId)

        if (!task) throw new BadRequestException('Category not found')
        else if (task.userId != author) throw new BadRequestException('You are not allowed to perform this request')
        
        return true
    }

    async updateTask(author: string, { taskId, name }: UpdateTaskInput): Promise<MessageResponse> {
        // Check if the user exist in the db
        const user = await this.usersRepository.findOne({ id: author })
        if (!user) throw new BadRequestException('User not found')

        // Check if the task exist in the db and user has permission to perform the request 
        const isTask = await this.checkTask(author, taskId)
        if (isTask) await this.taskRepository.update(taskId, { name })

        return { status: 200, message: 'successful' }
    }

    async deleteTask(author: string, { taskId }: TaskIdInput): Promise<MessageResponse> {
        // Check if the user exist in the db
        const user = await this.usersRepository.findOne({ id: author })
        if (!user) throw new BadRequestException('User not found')

        // Check if the task exist in the db and user has permission to perform the request 
        const isTask = await this.checkTask(author, taskId)
        if (isTask) await this.taskRepository.delete({ id: taskId })

        return { status: 200, message: 'successful' }
    }

    async getUserTasks(author: string) {
        // Check if the user exist in the db
        const user = await this.usersRepository.findOne({ id: author })
        if (!user) throw new BadRequestException('User not found')

        // Returning user tasks
        return await getUserTasks(author)
    }
}