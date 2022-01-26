import { Injectable } from '@nestjs/common'
import { CreateHangmanWordInput } from './dto/inputs/create-hangman-word.input'
import { UpdateHangmanWordInput } from './dto/inputs/update-hangman-word.input'
import { HangmanWordRepository } from './entities/hangman-word.repository'
import { GetHangmanWordsArgs } from './dto/args/get-hangman-words.args'
import { GetHangmanWordArgs } from './dto/args/get-hangman-word.args'
import { DeleteHangmanWordInput } from './dto/inputs/delete-hangman-word.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class HangmanWordService extends RepositoryProxyService<
    HangmanWordRepository,
    GetHangmanWordArgs,
    GetHangmanWordsArgs,
    CreateHangmanWordInput,
    UpdateHangmanWordInput,
    DeleteHangmanWordInput
> {
    constructor(repository: HangmanWordRepository) {
        super(repository)
    }
}
