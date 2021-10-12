import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class NameInput {
  @ApiProperty()
  @IsString()
  name: string
}

export class CategoryIdInput {
  @ApiProperty()
  @IsString()
  categoryId: string
}

export class UpdateCategoryInput {
  @ApiProperty()
  @IsString()
  categoryId: string

  @ApiProperty()
  @IsString()
  name: string
}
