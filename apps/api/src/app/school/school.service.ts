import { Injectable } from '@nestjs/common'
import { CreateSchoolInput } from './dto/inputs/create-school.input'
import { UpdateSchoolInput } from './dto/inputs/update-school.input'
import { SchoolRepository } from './entities/school.repository'
import { GetSchoolsArgs } from './dto/args/get-schools.args'
import { GetSchoolArgs } from './dto/args/get-school.args'
import { DeleteSchoolInput } from './dto/inputs/delete-school.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class SchoolService extends RepositoryProxyService<
    SchoolRepository,
    GetSchoolArgs,
    GetSchoolsArgs,
    CreateSchoolInput,
    UpdateSchoolInput,
    DeleteSchoolInput
> {
    constructor(repository: SchoolRepository) {
        super(repository)
    }
}
