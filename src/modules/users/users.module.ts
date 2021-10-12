import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './users.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PassportModule } from '@nestjs/passport'
import { GoogleStrategy } from './strategy/google.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '../../config/config.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [UsersController],
  providers: [UsersService, GoogleStrategy]
})

export class UsersModule {}
