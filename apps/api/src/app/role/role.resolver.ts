import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RoleService } from './role.service'
import { Role } from './entities/role.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetRoleArgs } from './dto/args/get-role.args'
import { IRole } from '@szakszolg-nx/api-interfaces'
import { GetRolesArgs } from './dto/args/get-roles.args'
import { CreateRoleInput } from './dto/inputs/create-role.input'
import { UpdateRoleInput } from './dto/inputs/update-role.input'
import { DeleteRoleInput } from './dto/inputs/delete-role.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => Role)
@Resource('roles')
export class RoleResolver {
    constructor(private readonly roleService: RoleService) {}

    @Query(() => Role, { nullable: true })
    @UseGuards(GqlAuthGuard)
    @Permission('read')
    role(@Args({ nullable: true }) data: GetRoleArgs): Promise<IRole> {
        return this.roleService.findOne(data)
    }

    @Query(() => [Role], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    roles(@Args({ nullable: true }) data: GetRolesArgs | null): Promise<IRole[]> {
        return this.roleService.findAll(data)
    }

    @Mutation(() => Role)
    @UseGuards(GqlAuthGuard)
    @Permission('create')
    createRole(@Args('createRoleData') data: CreateRoleInput): Promise<IRole> {
        return this.roleService.create(data)
    }

    @Mutation(() => Role)
    @UseGuards(GqlAuthGuard)
    @Permission('update')
    updateRole(@Args('updateRoleData') data: UpdateRoleInput): Promise<IRole> {
        return this.roleService.update(data)
    }

    @Mutation(() => Role)
    @UseGuards(GqlAuthGuard)
    @Permission('delete')
    deleteRole(@Args('deleteRoleData') data: DeleteRoleInput): Promise<IRole> {
        return this.roleService.delete(data)
    }
}
