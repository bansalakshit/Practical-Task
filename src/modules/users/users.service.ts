import { User } from './interfaces/user.interfaces'
import { UserInput, LoginInput } from './dto/users.dto'
import { BadRequestException, Get, Injectable, Req, UseGuards } from '@nestjs/common'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { getUserBy } from './users.repository'
import { Users } from './users.entity'
import { TokenResponse, UserInfoResponse } from './interfaces/users.response'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) {}

    async generateToken(id: string, email: string, displayName: string): Promise<string> {
        const payload = { id, email, displayName }
        const token = await this.jwtService.sign(payload)
        return token
    }

    async signUp({ email, displayName, password, confirmPassword }: UserInput): Promise<TokenResponse> {
        if (password != confirmPassword) throw new BadRequestException('Password mismatch')
        const existEmail = await this.usersRepository.findOne({ email: email.toLocaleLowerCase() })

        // Check if the user is already registered
        if (existEmail) throw new BadRequestException(`Email address ${email} is already registered`)
        const passwordDigest = await bcrypt.hash(password, 10)
        const newUuid = uuid()

        const register: User = {
            id: newUuid,
            email: email.toLocaleLowerCase(),
            passwordDigest,
            displayName,
        }

        // Inserting user
        await this.usersRepository.insert(register)

        // Generate token
        const token = await this.generateToken(newUuid, email.toLocaleLowerCase(), displayName)
        return { status: 200, token }
    }

    async login({ email, password }: LoginInput): Promise<TokenResponse> {
        // Check if the user exist in the db
        const userInfo = await this.usersRepository.findOne({ email })
        if (!userInfo) throw new BadRequestException('User not found')

        // Verify password
        const verify = await bcrypt.compare(password, userInfo.passwordDigest)
        if (verify == false) throw new BadRequestException('Wrong password')

        const { id, displayName } = userInfo

        // Generate token
        const token = await this.generateToken(id, email, displayName)
        return { status: 200, token }
    }

    async googleAuth({ user }): Promise<TokenResponse> {
        // Check if the user exist in the db
        const existUser = await this.usersRepository.findOne({ email: user.email.toLocaleLowerCase() })

        // If exist then return token
        if (existUser) {
            const { id, email, displayName } = existUser

            // Generate token
            const token = await this.generateToken(id, email, displayName)
            return { status: 200, token }

        // Else insert user and then generate token
        } else {
            const newUuid = uuid()
            const register: User = {
                id: newUuid,
                email: user.email.toLocaleLowerCase(),
                displayName: user.name,
            }
            await this.usersRepository.insert(register)

            // Generate token
            const token = await this.generateToken(newUuid, user.email.toLocaleLowerCase(), user.name)
            return { status: 200, token }
        }
    }

    async getUserInfo(author: string): Promise<UserInfoResponse> {
        // Fetching user info
        const [user] = await getUserBy(author)
        if (!user) throw new BadRequestException('User not found')
        return user
    }
}
