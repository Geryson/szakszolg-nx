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

@Resolver(() => Role)
export class RoleResolver {
    constructor(private readonly roleService: RoleService) {}

    @Query(() => Role, { nullable: true })
    @UseGuards(GqlAuthGuard)
    role(@Args({ nullable: true }) data: GetRoleArgs): Promise<IRole> {
        return this.roleService.findOne(data)
    }

    @Query(() => [Role], { nullable: 'items' })
    @UseGuards(GqlAuthGuard)
    roles(@Args({ nullable: true }) data: GetRolesArgs | null): Promise<IRole[]> {
        return this.roleService.findAll(data)
    }

    @Mutation(() => Role)
    @UseGuards(GqlAuthGuard)
    createRole(@Args('createRoleData') data: CreateRoleInput): Promise<IRole> {
        return this.roleService.create(data)
    }

    @Mutation(() => Role)
    @UseGuards(GqlAuthGuard)
    updateRole(@Args('updateRoleData') data: UpdateRoleInput): Promise<IRole> {
        return this.roleService.update(data)
    }

    @Mutation(() => Role)
    @UseGuards(GqlAuthGuard)
    deleteRole(@Args('deleteRoleData') data: DeleteRoleInput): Promise<IRole> {
        return this.roleService.delete(data)
    }
}
