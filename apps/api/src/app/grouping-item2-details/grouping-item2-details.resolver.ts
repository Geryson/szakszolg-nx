import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { GroupingItem2DetailsService } from './grouping-item2-details.service'
import { GroupingItem2Details } from './entities/grouping-item2-details.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetGroupingItem2DetailsArgs } from './dto/args/get-grouping-item2-details.args'
import { IGroupingItem2Details } from '@szakszolg-nx/api-interfaces'
import { GetGroupingItems2DetailsArgs } from './dto/args/get-grouping-items2-details.args'
import { CreateGroupingItem2DetailsInput } from './dto/inputs/create-grouping-item2-details.input'
import { UpdateGroupingItem2DetailsInput } from './dto/inputs/update-grouping-item2-details.input'
import { DeleteGroupingItem2DetailsInput } from './dto/inputs/delete-grouping-item2-details.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => GroupingItem2Details)
@Resource('grouping-items2')
export class GroupingItem2DetailsResolver {
    constructor(private readonly service: GroupingItem2DetailsService) {}

    @Query(() => GroupingItem2Details, { nullable: true })
    groupingItem2Details(@Args({ nullable: true }) data: GetGroupingItem2DetailsArgs): Promise<IGroupingItem2Details> {
        return this.service.findOne(data)
    }

    @Query(() => [GroupingItem2Details], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    groupingItems2Details(@Args({ nullable: true }) data: GetGroupingItems2DetailsArgs | null): Promise<IGroupingItem2Details[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => GroupingItem2Details)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createGroupingItem2Details(@Args('createGroupingItem2DetailsData') data: CreateGroupingItem2DetailsInput): Promise<IGroupingItem2Details> {
        return this.service.create(data)
    }

    @Mutation(() => GroupingItem2Details)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateGroupingItem2Details(@Args('updateGroupingItem2DetailsData') data: UpdateGroupingItem2DetailsInput): Promise<IGroupingItem2Details> {
        return this.service.update(data)
    }

    @Mutation(() => GroupingItem2Details)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteGroupingItem2Details(@Args('deleteGroupingItem2DetailsData') data: DeleteGroupingItem2DetailsInput): Promise<IGroupingItem2Details> {
        return this.service.delete(data)
    }
}
