import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { GroupingItemService } from './grouping-item.service'
import { GroupingItem } from './entities/grouping-item.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetGroupingItemArgs } from './dto/args/get-grouping-item.args'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { GetGroupingItemsArgs } from './dto/args/get-grouping-items.args'
import { CreateGroupingItemInput } from './dto/inputs/create-grouping-item.input'
import { UpdateGroupingItemInput } from './dto/inputs/update-grouping-item.input'
import { DeleteGroupingItemInput } from './dto/inputs/delete-grouping-item.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => GroupingItem)
@Resource('grouping-items')
export class GroupingItemResolver {
    constructor(private readonly service: GroupingItemService) {}

    @Query(() => GroupingItem, { nullable: true })
    groupingItem(@Args({ nullable: true }) data: GetGroupingItemArgs): Promise<IGroupingItem> {
        return this.service.findOne(data)
    }

    @Query(() => [GroupingItem], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    groupingItems(@Args({ nullable: true }) data: GetGroupingItemsArgs | null): Promise<IGroupingItem[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => GroupingItem)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createGroupingItem(@Args('createGroupingItemData') data: CreateGroupingItemInput): Promise<IGroupingItem> {
        return this.service.create(data)
    }

    @Mutation(() => GroupingItem)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateGroupingItem(@Args('updateGroupingItemData') data: UpdateGroupingItemInput): Promise<IGroupingItem> {
        return this.service.update(data)
    }

    @Mutation(() => GroupingItem)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteGroupingItem(@Args('deleteGroupingItemData') data: DeleteGroupingItemInput): Promise<IGroupingItem> {
        return this.service.delete(data)
    }
}
