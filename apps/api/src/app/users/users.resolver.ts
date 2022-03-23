import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { GetUserArgs } from './dto/args/get-user.args'
import { GetUsersArgs } from './dto/args/get-users.args'
import { CreateUserInput } from './dto/inputs/create-user.input'
import { UpdateUserInput } from './dto/inputs/update-user.input'
import { DeleteUserInput } from './dto/inputs/delete-user.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'
import { CurrentUser } from '../auth/decorators/current-user.decorator'

@Resolver(() => User)
@Resource('users')
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User, { nullable: true })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('read')
    user(@Args() data: GetUserArgs): Promise<IUser> {
        return this.usersService.findOne(data)
    }

    @Query(() => User, { nullable: true })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    profile(@CurrentUser() user: IUser): Promise<IUser> {
        return this.usersService.findOne({ id: user._id })
    }

    @Query(() => [User], { nullable: 'items' })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('browse')
    users(@Args({ nullable: true }) data: GetUsersArgs | null): Promise<IUser[]> {
        return this.usersService.findAll(data)
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('add')
    createUser(@Args('createUserData') data: CreateUserInput): Promise<IUser> {
        return this.usersService.create(data)
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('edit')
    updateUser(@Args('updateUserData') data: UpdateUserInput): Promise<IUser> {
        return this.usersService.update(data)
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteUser(@Args('deleteUserData') data: DeleteUserInput): Promise<IUser> {
        return this.usersService.delete(data)
    }
}
