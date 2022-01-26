import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { __PascalCase__Service } from './__kebab-case__.service'
import { __PascalCase__ } from './entities/__kebab-case__.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { Get__PascalCase__Args } from './dto/args/get-__kebab-case__.args'
import { I__PascalCase__ } from '@szakszolg-nx/api-interfaces'
import { Get__PascalCase__sArgs } from './dto/args/get-__kebab-case__s.args'
import { Create__PascalCase__Input } from './dto/inputs/create-__kebab-case__.input'
import { Update__PascalCase__Input } from './dto/inputs/update-__kebab-case__.input'
import { Delete__PascalCase__Input } from './dto/inputs/delete-__kebab-case__.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => __PascalCase__)
@Resource('__kebab-case__s')
export class __PascalCase__Resolver {
    constructor(private readonly service: __PascalCase__Service) {}

    @Query(() => __PascalCase__, { nullable: true })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('read')
    __kebab-case__(@Args({ nullable: true }) data: Get__PascalCase__Args): Promise<I__PascalCase__> {
        return this.service.findOne(data)
    }

    @Query(() => [__PascalCase__], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    __kebab-case__s(@Args({ nullable: true }) data: Get__PascalCase__sArgs | null): Promise<I__PascalCase__[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => __PascalCase__)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    create__PascalCase__(@Args('create__PascalCase__Data') data: Create__PascalCase__Input): Promise<I__PascalCase__> {
        return this.service.create(data)
    }

    @Mutation(() => __PascalCase__)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    update__PascalCase__(@Args('update__PascalCase__Data') data: Update__PascalCase__Input): Promise<I__PascalCase__> {
        return this.service.update(data)
    }

    @Mutation(() => __PascalCase__)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    delete__PascalCase__(@Args('delete__PascalCase__Data') data: Delete__PascalCase__Input): Promise<I__PascalCase__> {
        return this.service.delete(data)
    }
}
