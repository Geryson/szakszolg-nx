import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { GroupingItem2Service } from './grouping-item2.service'
import { GroupingItem2 } from './entities/grouping-item2.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetGroupingItem2Args } from './dto/args/get-grouping-item2.args'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { GetGroupingItems2Args } from './dto/args/get-grouping-items2.args'
import { CreateGroupingItem2Input } from './dto/inputs/create-grouping-item2.input'
import { UpdateGroupingItem2Input } from './dto/inputs/update-grouping-item2.input'
import { DeleteGroupingItem2Input } from './dto/inputs/delete-grouping-item2.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => GroupingItem2)
@Resource('grouping-items')
export class GroupingItem2Resolver {
    constructor(private readonly service: GroupingItem2Service) {}

    @Query(() => GroupingItem2, { nullable: true })
    groupingItem(@Args({ nullable: true }) data: GetGroupingItem2Args): Promise<IGroupingItem> {
        return this.service.findOne(data)
    }

    @Query(() => [GroupingItem2], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    groupingItems(@Args({ nullable: true }) data: GetGroupingItems2Args | null): Promise<IGroupingItem[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => GroupingItem2)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createGroupingItem(@Args('createGroupingItemData') data: CreateGroupingItem2Input): Promise<IGroupingItem> {
        return this.service.create(data)
    }

    @Mutation(() => GroupingItem2)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateGroupingItem(@Args('updateGroupingItemData') data: UpdateGroupingItem2Input): Promise<IGroupingItem> {
        return this.service.update(data)
    }

    @Mutation(() => GroupingItem2)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteGroupingItem(@Args('deleteGroupingItemData') data: DeleteGroupingItem2Input): Promise<IGroupingItem> {
        return this.service.delete(data)
    }
}
