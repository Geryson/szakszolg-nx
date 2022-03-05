import { Injectable } from '@nestjs/common'
import { CreateTokenInput } from './dto/inputs/create-token.input'
import { UpdateTokenInput } from './dto/inputs/update-token.input'
import { TokenRepository } from './entities/token.repository'
import { GetTokensArgs } from './dto/args/get-tokens.args'
import { GetTokenArgs } from './dto/args/get-token.args'
import { DeleteTokenInput } from './dto/inputs/delete-token.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class TokenService extends RepositoryProxyService<
    TokenRepository,
    GetTokenArgs,
    GetTokensArgs,
    CreateTokenInput,
    UpdateTokenInput,
    DeleteTokenInput
> {
    constructor(repository: TokenRepository) {
        super(repository)
    }
}
