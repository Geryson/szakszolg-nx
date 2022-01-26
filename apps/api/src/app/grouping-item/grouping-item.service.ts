import { Injectable } from '@nestjs/common'
import { CreateGroupingItemInput } from './dto/inputs/create-grouping-item.input'
import { UpdateGroupingItemInput } from './dto/inputs/update-grouping-item.input'
import { GroupingItemRepository } from './entities/grouping-item.repository'
import { GetGroupingItemsArgs } from './dto/args/get-grouping-items.args'
import { GetGroupingItemArgs } from './dto/args/get-grouping-item.args'
import { DeleteGroupingItemInput } from './dto/inputs/delete-grouping-item.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class GroupingItemService extends RepositoryProxyService<
    GroupingItemRepository,
    GetGroupingItemArgs,
    GetGroupingItemsArgs,
    CreateGroupingItemInput,
    UpdateGroupingItemInput,
    DeleteGroupingItemInput
> {
    constructor(repository: GroupingItemRepository) {
        super(repository)
    }
}
