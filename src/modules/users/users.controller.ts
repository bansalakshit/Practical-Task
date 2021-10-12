import { UsersService } from './users.service'
import { LoginInput, UserInput } from './dto/users.dto'
import { TokenResponse, UserInfoResponse } from './interfaces/users.response'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth, GetUserId } from './auth.guards'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
@ApiTags('User')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // User signup
    @Post('signUp')
    @ApiOkResponse({ description: 'User signUp' })
    async signUp(@Body() data: UserInput): Promise<TokenResponse> {
        return await this.usersService.signUp(data)
    }

    // User login
    @Post('login')
    @ApiOkResponse({ description: 'User login' })
    async login(@Body() data: LoginInput): Promise<TokenResponse> {
        return await this.usersService.login(data)
    }

    // Google auth
    @Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth() {}

    @Get('auth/google/callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req: any): Promise<TokenResponse> {
        return await this.usersService.googleAuth(req.user)
    }

    // Fetch user info 
    @Get('info')
    @ApiOkResponse({ description: 'Get user info' })
    @ApiBearerAuth()
    @Auth()
    async getUserInfo(@GetUserId() user): Promise<UserInfoResponse> {
        return await this.usersService.getUserInfo(user.id)
    }
}
