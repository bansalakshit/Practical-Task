import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { ConfigService } from './config/config.service'
import { CategoryModule } from './modules/category/category.module'
import { TaskModule } from './modules/task/task.module'

export function setupSwagger(app: INestApplication, configService: ConfigService) {
  const options = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE'))
    .setDescription(configService.get('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get('SWAGGER_VERSION'))
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options, {
    include: [UsersModule, CategoryModule, TaskModule],
  })
  SwaggerModule.setup('swagger', app, document)
}
