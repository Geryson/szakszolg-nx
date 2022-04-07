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
import { GroupingItem2Module } from './grouping-item2/grouping-item2.module'
import { SchoolModule } from './school/school.module'
import { QuizModule } from './quiz/quiz.module'
import { QuizAnswerModule } from './quiz-answer/quiz-answer.module'
import { TokenModule } from './token/token.module'
import { PuzzleModule } from './puzzle/puzzle.module'
import { QuizAnswerOptionModule } from './quiz-answer-option/quiz-answer-option.module'

@Module({
    imports: [
        CoreModule,
        UsersModule,
        AuthModule,
        RoleModule,
        MirrorWordModule,
        HangmanWordModule,
        GroupingItemModule,
        GroupingItem2Module,
        SchoolModule,
        QuizModule,
        QuizAnswerModule,
        QuizAnswerOptionModule,
        TokenModule,
        PuzzleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
