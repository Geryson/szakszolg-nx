import { Injectable } from '@nestjs/common'
import { SimpleRepository } from './simple.repository'
import { IdArg, IdArrayArg } from '../gql-args/id.args'
import { IdInput } from '../gql-inputs/id.input'

@Injectable()
export class RepositoryProxyService<
    TRepository extends SimpleRepository<
        any,
        any,
        TFindOneArgs,
        TFindManyArgs,
        TCreateInput,
        TUpdateInput,
        TDeleteInput
    >,
    TFindOneArgs extends IdArg,
    TFindManyArgs extends IdArrayArg,
    TCreateInput,
    TUpdateInput extends IdInput,
    TDeleteInput extends IdInput,
> {
    constructor(protected readonly repository: TRepository) {}

    create(data: TCreateInput) {
        return this.repository.create(data)
    }

    findAll(data: TFindManyArgs) {
        return this.repository.findAll(data)
    }

    findOne(data: TFindOneArgs) {
        return this.repository.findOne(data)
    }

    update(data: TUpdateInput) {
        return this.repository.update(data)
    }

    delete(data: TDeleteInput) {
        return this.repository.delete(data)
    }
}
