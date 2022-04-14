import { Injectable } from '@nestjs/common'
import { CreateGroupingItem2DetailsInput } from './dto/inputs/create-grouping-item2-details.input'
import { UpdateGroupingItem2DetailsInput } from './dto/inputs/update-grouping-item2-details.input'
import { GroupingItem2DetailsRepository } from './entities/grouping-item2-details.repository'
import { GetGroupingItems2DetailsArgs } from './dto/args/get-grouping-items2-details.args'
import { GetGroupingItem2DetailsArgs } from './dto/args/get-grouping-item2-details.args'
import { DeleteGroupingItem2DetailsInput } from './dto/inputs/delete-grouping-item2-details.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class GroupingItem2DetailsService extends RepositoryProxyService<
    GroupingItem2DetailsRepository,
    GetGroupingItem2DetailsArgs,
    GetGroupingItems2DetailsArgs,
    CreateGroupingItem2DetailsInput,
    UpdateGroupingItem2DetailsInput,
    DeleteGroupingItem2DetailsInput
> {
    constructor(repository: GroupingItem2DetailsRepository) {
        super(repository)
    }
}
