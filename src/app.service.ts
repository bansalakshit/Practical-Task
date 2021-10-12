import { Injectable } from '@nestjs/common'
import 'dotenv/config'

@Injectable()
export class AppService {
  getVersion() {
    return {
      title: process.env.SWAGGER_TITLE,
      description: process.env.SWAGGER_DESCRIPTION,
      version: process.env.SWAGGER_VERSION,
    }
  }
}
