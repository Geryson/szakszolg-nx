import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app/app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config = app.get(ConfigService)
    const globalPrefix = 'api'
    app.setGlobalPrefix(globalPrefix)
    const port = config.get('API_PORT') || 3000
    app.enableCors()
    await app.listen(port)
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
