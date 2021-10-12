import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'modules/users/users.entity'
import { Categories } from './category.entity'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Categories])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})

export class CategoryModule {}
