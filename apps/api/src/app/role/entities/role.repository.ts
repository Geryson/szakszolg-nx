import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Role, RoleDocument } from './role.entity'
import { Model } from 'mongoose'
import { UpdateRoleInput } from '../dto/inputs/update-role.input'
import { CreateRoleInput } from '../dto/inputs/create-role.input'
import { GetRolesArgs } from '../dto/args/get-roles.args'
import { GetRoleArgs } from '../dto/args/get-role.args'
import { IRole } from '@szakszolg-nx/api-interfaces'
import { DeleteRoleInput } from '../dto/inputs/delete-role.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class RoleRepository extends SimpleRepository<
    RoleDocument,
    IRole,
    GetRoleArgs,
    GetRolesArgs,
    CreateRoleInput,
    UpdateRoleInput,
    DeleteRoleInput
> {
    constructor(@InjectModel(Role.name) roleModel: Model<RoleDocument>) {
        super(roleModel)
    }
}
