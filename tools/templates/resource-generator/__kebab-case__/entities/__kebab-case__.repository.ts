import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { __PascalCase__, __PascalCase__Document } from './__kebab-case__.entity'
import { Model } from 'mongoose'
import { Update__PascalCase__Input } from '../dto/inputs/update-__kebab-case__.input'
import { Create__PascalCase__Input } from '../dto/inputs/create-__kebab-case__.input'
import { Get__PascalCase__sArgs } from '../dto/args/get-__kebab-case__s.args'
import { Get__PascalCase__Args } from '../dto/args/get-__kebab-case__.args'
import { I__PascalCase__ } from '@szakszolg-nx/api-interfaces'
import { Delete__PascalCase__Input } from '../dto/inputs/delete-__kebab-case__.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class __PascalCase__Repository extends SimpleRepository<
    __PascalCase__Document,
    I__PascalCase__,
    Get__PascalCase__Args,
    Get__PascalCase__sArgs,
    Create__PascalCase__Input,
    Update__PascalCase__Input,
    Delete__PascalCase__Input
> {
    constructor(@InjectModel(__PascalCase__.name) __camelCase__Model: Model<__PascalCase__Document>) {
        super(__camelCase__Model)
    }

    // TODO: Check if anything needs to be overridden
}
