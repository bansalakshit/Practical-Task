import * as dotenv from 'dotenv'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export class ConfigService {
  constructor() {
    dotenv.config({ path: `.development.env` })
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n')
    }
  }

  public get(key: string): string {
    return process.env[key]
  }

  public getNumber(key: string): number {
    return Number(this.get(key))
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../modules/**/*.entity{.ts,.js}']

    if ((module as any).hot) {
      const entityContext = (require as any).context('./../modules', true, /\.entity\.ts$/)
      entities = entityContext.keys().map(id => {
        const entityModule = entityContext(id)
        const [entity] = Object.values(entityModule)
        return entity
      })
    }
    
    return {
      entities,
      keepConnectionAlive: true,
      type: 'postgres',
      synchronize: true,
      host: this.get('POSTGRES_HOST'),
      port: this.getNumber('POSTGRES_PORT'),
      username: this.get('POSTGRES_USERNAME'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),
      logging: ['error']
    }
  }
}
