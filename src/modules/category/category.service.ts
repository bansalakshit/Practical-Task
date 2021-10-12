import { Category } from './interfaces/category.interfaces'
import { CategoryIdInput, NameInput, UpdateCategoryInput } from './dto/category.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
import { Categories } from './category.entity'
import { Users } from '../users/users.entity'
import { getCategoryInfoBy } from './category.repository'
import { GetCategoryInfo } from './interfaces/category.response'
import { MessageResponse } from './interfaces/category.response'

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Categories) private categoryRepository: Repository<Categories>,
    ) {}

    async newCategory(author: string, { name }: NameInput): Promise<MessageResponse> {
        // Check if the user exist in the db
        const user = await this.usersRepository.findOne({ id: author })
        if (!user) throw new BadRequestException('User not found')

        // Check if the category exist in the db
        const category = await this.categoryRepository.findOne({ name })
        if (category) throw new BadRequestException('Category with this name already exist')

        const newUuid = uuid()
        const cateoryObj: Category = {
            id: newUuid,
            name,
            userId: author
        }

        // Insert category
        await this.categoryRepository.insert(cateoryObj)
        return { status: 200, message: 'successful' }
    }

    async checkCategory(author: string, categoryId: string) {
        const [category] = await getCategoryInfoBy(author, categoryId)

        if (!category) throw new BadRequestException('Category not found')
        else if (category.userId != author) throw new BadRequestException('You are not allowed to perform this request')
        
        return true
    }

    async updateCategory(author: string, { categoryId, name }: UpdateCategoryInput): Promise<MessageResponse> {
        // Check if the user exist in the db
        const user = await this.usersRepository.findOne({ id: author })
        if (!user) throw new BadRequestException('User not found')

        // Check if the category exist in the db and user has permission to perform the request
        const isCategory = await this.checkCategory(author, categoryId)
        if (isCategory) await this.categoryRepository.update(categoryId, { name })

        return { status: 200, message: 'successful' }
    }

    async deleteCategory(author: string, { categoryId }: CategoryIdInput): Promise<MessageResponse> {
        // Check if the user exist in the db
        const user = await this.usersRepository.findOne({ id: author })
        if (!user) throw new BadRequestException('User not found')

        // Check if the category exist in the db and user has permission to perform the request
        const isCategory = await this.checkCategory(author, categoryId)
        if (isCategory) await this.categoryRepository.delete({ id: categoryId })
        return { status: 200, message: 'successful' }
    }

    async getUserCategories(author: string): Promise<GetCategoryInfo> {
        // Check if the user exist in the db
        const user = await this.usersRepository.findOne({ id: author })
        if (!user) throw new BadRequestException('User not found')

        // Returning user categories
        return await getCategoryInfoBy(author)
    }
}