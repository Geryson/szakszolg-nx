import { Injectable } from '@nestjs/common'
import { CreateRoleInput } from './dto/inputs/create-role.input'
import { UpdateRoleInput } from './dto/inputs/update-role.input'
import { RoleRepository } from './entities/role.repository'
import { GetRolesArgs } from './dto/args/get-roles.args'
import { GetRoleArgs } from './dto/args/get-role.args'
import { DeleteRoleInput } from './dto/inputs/delete-role.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class RoleService extends RepositoryProxyService<
    RoleRepository,
    GetRoleArgs,
    GetRolesArgs,
    CreateRoleInput,
    UpdateRoleInput,
    DeleteRoleInput
> {
    constructor(roleRepository: RoleRepository) {
        super(roleRepository)
    }
}
