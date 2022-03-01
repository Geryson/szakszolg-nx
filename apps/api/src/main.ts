import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app/app.module'
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql'
import { UsersResolver } from './app/users/users.resolver'
import { RoleResolver } from './app/role/role.resolver'
import { MirrorWordResolver } from './app/mirror-word/mirror-word.resolver'
import { HangmanWordResolver } from './app/hangman-word/hangman-word.resolver'
import { CoreResolver } from './app/core/core.resolver'
import { GroupingItemResolver } from './app/grouping-item/grouping-item.resolver'
import { QuizResolver } from './app/quiz/quiz.resolver'
import { QuizQuestionResolver } from './app/quiz-question/quiz-question.resolver'
import { QuizAnswerResolver } from './app/quiz-answer/quiz-answer.resolver'
import { SchoolResolver } from './app/school/school.resolver'
import { printSchema } from 'graphql'
import * as bodyParser from 'body-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config = app.get(ConfigService)
    const globalPrefix = 'api'
    app.setGlobalPrefix(globalPrefix)
    const port = config.get('API_PORT') || 3000
    app.enableCors()
    app.use(bodyParser.json({ limit: '50mb' }))
    await app.listen(port)
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([
        UsersResolver,
        RoleResolver,
        MirrorWordResolver,
        HangmanWordResolver,
        CoreResolver,
        GroupingItemResolver,
        QuizResolver,
        QuizQuestionResolver,
        QuizAnswerResolver,
        SchoolResolver,
    ])
    console.log(printSchema(schema))
}
if (process.argv.includes('--schema')) {
    generateSchema()
} else {
    bootstrap()
}
