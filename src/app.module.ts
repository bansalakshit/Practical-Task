import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { ConfigService } from './config/config.service'
import { UsersModule } from './modules/users/users.module'
import { CategoryModule } from './modules/category/category.module'
import { TaskModule } from './modules/task/task.module'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    CategoryModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
