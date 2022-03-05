import { Module } from '@nestjs/common'

import { AppController } from './core/app.controller'
import { AppService } from './core/app.service'
import { CoreModule } from './core/core.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './role/role.module'
import { MirrorWordModule } from './mirror-word/mirror-word.module'
import { HangmanWordModule } from './hangman-word/hangman-word.module'
import { GroupingItemModule } from './grouping-item/grouping-item.module'
import { SchoolModule } from './school/school.module'
import { QuizModule } from './quiz/quiz.module'
import { QuizAnswerModule } from './quiz-answer/quiz-answer.module'
import { FileModule } from './file/file.module'
import { PuzzleModule } from './puzzle/puzzle.module'

@Module({
    imports: [
        CoreModule,
        FileModule,
        UsersModule,
        AuthModule,
        RoleModule,
        MirrorWordModule,
        HangmanWordModule,
        GroupingItemModule,
        SchoolModule,
        QuizModule,
        QuizAnswerModule,
        PuzzleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
