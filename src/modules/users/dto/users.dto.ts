import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsOptional, MaxLength } from 'class-validator'

export class LoginInput {
  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}

export class UserInput {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  displayName: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  confirmPassword: string
}
