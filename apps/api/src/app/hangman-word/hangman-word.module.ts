import { Module } from '@nestjs/common'
import { HangmanWordService } from './hangman-word.service'
import { HangmanWordResolver } from './hangman-word.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { HangmanWord, HangmanWordSchema } from './entities/hangman-word.entity'
import { HangmanWordRepository } from './entities/hangman-word.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: HangmanWord.name,
                schema: HangmanWordSchema,
            },
        ]),
    ],
    providers: [HangmanWordResolver, HangmanWordService, HangmanWordRepository],
    exports: [HangmanWordService, HangmanWordRepository],
})
export class HangmanWordModule {}
