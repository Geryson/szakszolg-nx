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

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User, { nullable: true })
    @UseGuards(GqlAuthGuard)
    async user(@Args() data: GetUserArgs): Promise<User> {
        return this.usersService.findOne(data)
    }

    @Query(() => [User], { nullable: 'items' })
    @UseGuards(GqlAuthGuard)
    users(@Args({ nullable: true }) data: GetUsersArgs | null): Promise<User[]> {
        return this.usersService.findAll(data)
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') data: CreateUserInput): Promise<User> {
        return this.usersService.create(data)
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserData') data: UpdateUserInput): Promise<User> {
        return this.usersService.update(data)
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    deleteUser(@Args('deleteUserData') data: DeleteUserInput): Promise<User> {
        return this.usersService.delete(data)
    }
}
