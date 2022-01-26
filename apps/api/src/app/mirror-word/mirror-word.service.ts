import { Injectable } from '@nestjs/common'
import { CreateMirrorWordInput } from './dto/inputs/create-mirror-word.input'
import { UpdateMirrorWordInput } from './dto/inputs/update-mirror-word.input'
import { MirrorWordRepository } from './entities/mirror-word.repository'
import { GetMirrorWordsArgs } from './dto/args/get-mirror-words.args'
import { GetMirrorWordArgs } from './dto/args/get-mirror-word.args'
import { DeleteMirrorWordInput } from './dto/inputs/delete-mirror-word.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class MirrorWordService extends RepositoryProxyService<
    MirrorWordRepository,
    GetMirrorWordArgs,
    GetMirrorWordsArgs,
    CreateMirrorWordInput,
    UpdateMirrorWordInput,
    DeleteMirrorWordInput
> {
    constructor(repository: MirrorWordRepository) {
        super(repository)
    }
}
