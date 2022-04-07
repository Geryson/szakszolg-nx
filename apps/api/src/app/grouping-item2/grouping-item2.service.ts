import { Injectable } from '@nestjs/common'
import { CreateGroupingItem2Input } from './dto/inputs/create-grouping-item2.input'
import { UpdateGroupingItem2Input } from './dto/inputs/update-grouping-item2.input'
import { GroupingItem2Repository } from './entities/grouping-item2.repository'
import { GetGroupingItems2Args } from './dto/args/get-grouping-items2.args'
import { GetGroupingItem2Args } from './dto/args/get-grouping-item2.args'
import { DeleteGroupingItem2Input } from './dto/inputs/delete-grouping-item2.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class GroupingItem2Service extends RepositoryProxyService<
    GroupingItem2Repository,
    GetGroupingItem2Args,
    GetGroupingItems2Args,
    CreateGroupingItem2Input,
    UpdateGroupingItem2Input,
    DeleteGroupingItem2Input
> {
    constructor(repository: GroupingItem2Repository) {
        super(repository)
    }
}
