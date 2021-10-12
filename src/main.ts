import { NestFactory } from '@nestjs/core'
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'
import { setupSwagger } from './swagger'
import * as compression from 'compression'
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true })
  app.use(helmet())
  app.use(compression())

  const configService = app.get(ConfigService)
  setupSwagger(app, configService)

  const port = configService.getNumber('PORT') || 3000
  await app.listen(port)
}

bootstrap()
