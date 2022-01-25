import { Injectable } from '@nestjs/common'
import { Create__PascalCase__Input } from './dto/inputs/create-__kebab-case__.input'
import { Update__PascalCase__Input } from './dto/inputs/update-__kebab-case__.input'
import { __PascalCase__Repository } from './entities/__kebab-case__.repository'
import { Get__PascalCase__sArgs } from './dto/args/get-__kebab-case__s.args'
import { Get__PascalCase__Args } from './dto/args/get-__kebab-case__.args'
import { Delete__PascalCase__Input } from './dto/inputs/delete-__kebab-case__.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class __PascalCase__Service extends RepositoryProxyService<
    __PascalCase__Repository,
    Get__PascalCase__Args,
    Get__PascalCase__sArgs,
    Create__PascalCase__Input,
    Update__PascalCase__Input,
    Delete__PascalCase__Input
> {
    constructor(repository: __PascalCase__Repository) {
        super(repository)
    }
}
