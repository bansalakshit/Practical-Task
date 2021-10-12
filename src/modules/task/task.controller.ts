import { TaskService } from './task.service'
import { Auth, GetUserId } from '../users/auth.guards'
import { CreateTaskInput, TaskIdInput, UpdateTaskInput } from './dto/task.dto'
import { GetTaskInfo, MessageResponse } from './interfaces/task.response'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@Controller('task')
@ApiTags('Task')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    // Create task
    @Post('create')
    @ApiOkResponse({ description: 'Create task' })
    @ApiBearerAuth()
    @Auth()
    async createTask(@GetUserId() user, @Body() data: CreateTaskInput): Promise<MessageResponse> {
        return await this.taskService.createTask(user.id, data)
    }

    // Update task
    @Put('update')
    @ApiOkResponse({ description: 'Update task' })
    @ApiBearerAuth()
    @Auth()
    async updateTaskStatus(@GetUserId() user, @Body() data: UpdateTaskInput): Promise<MessageResponse> {
        return await this.taskService.updateTask(user.id, data)
    }

    // Delete task
    @Delete('delete')
    @ApiOkResponse({ description: 'Delete task' })
    @ApiBearerAuth()
    @Auth()
    async deleteTask(@GetUserId() user, @Body() data: TaskIdInput): Promise<MessageResponse> {
        return await this.taskService.deleteTask(user.id, data)
    }

    // Fetch user tasks
    @Get('all')
    @ApiOkResponse({ description: 'Get user tasks info' })
    @ApiBearerAuth()
    @Auth()
    async getUserTasks(@GetUserId() user): Promise<GetTaskInfo> {
        return await this.taskService.getUserTasks(user.id)
    }
}