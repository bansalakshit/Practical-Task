import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
  applyDecorators,
  UseGuards,
  createParamDecorator,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '../../config/config.service'
const configService = new ConfigService()

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    if (!req.headers.authorization) return false
    req.user = await this.validateToken(req.headers.authorization)
    return true
  }

  async validateToken(auth: string) {
    try {
      if (auth.split(' ')[0] !== 'Bearer') throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
      const token = auth.split(' ')[1]
      const decoded = await jwt.verify(token, configService.get('JWT_SECRET_KEY'))
      return decoded
    } catch (err) {
      const message = 'Token error- ' + err.message
      throw new HttpException(message, HttpStatus.FORBIDDEN)
    }
  }
}

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard))
}

export const GetUserId = createParamDecorator((data, req): string => {
  return req.user
})
