import { CategoryService } from './category.service'
import { Auth, GetUserId } from '../users/auth.guards'
import { CategoryIdInput, NameInput, UpdateCategoryInput } from './dto/category.dto'
import { GetCategoryInfo, MessageResponse } from './interfaces/category.response'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // New category
    @Post('create')
    @ApiOkResponse({ description: 'Create new category' })
    @ApiBearerAuth()
    @Auth()
    async newCategory(@GetUserId() user, @Body() data: NameInput): Promise<MessageResponse> {
        return await this.categoryService.newCategory(user.id, data)
    }

    // Delete category 
    @Delete('delete')
    @ApiOkResponse({ description: 'Delete category' })
    @ApiBearerAuth()
    @Auth()
    async deleteCategory(@GetUserId() user,@Body() data: CategoryIdInput): Promise<MessageResponse> {
        return await this.categoryService.deleteCategory(user.id, data)
    }

    // Update category
    @Put('update')
    @ApiOkResponse({ description: 'Update category' })
    @ApiBearerAuth()
    @Auth()
    async updateCategory(@GetUserId() user,@Body() data: UpdateCategoryInput): Promise<MessageResponse> {
        return await this.categoryService.updateCategory(user.id, data)
    }
    
    // Fetch user categories 
    @Get('all')
    @ApiOkResponse({ description: 'Get user categories info' })
    @ApiBearerAuth()
    @Auth()
    async getUserCategories(@GetUserId() user): Promise<GetCategoryInfo> {
        return await this.categoryService.getUserCategories(user.id)
    }
}
