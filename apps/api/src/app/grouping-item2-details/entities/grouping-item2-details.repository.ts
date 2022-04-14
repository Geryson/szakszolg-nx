import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { GroupingItem2Details, GroupingItemDetailsDocument } from './grouping-item2-details.entity'
import { Model } from 'mongoose'
import { UpdateGroupingItem2DetailsInput } from '../dto/inputs/update-grouping-item2-details.input'
import { CreateGroupingItem2DetailsInput } from '../dto/inputs/create-grouping-item2-details.input'
import { GetGroupingItems2DetailsArgs } from '../dto/args/get-grouping-items2-details.args'
import { GetGroupingItem2DetailsArgs } from '../dto/args/get-grouping-item2-details.args'
import {IGroupingItem2Details} from '@szakszolg-nx/api-interfaces'
import { DeleteGroupingItem2DetailsInput } from '../dto/inputs/delete-grouping-item2-details.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class GroupingItem2DetailsRepository extends SimpleRepository<
    GroupingItemDetailsDocument,
    IGroupingItem2Details,
    GetGroupingItem2DetailsArgs,
    GetGroupingItems2DetailsArgs,
    CreateGroupingItem2DetailsInput,
    UpdateGroupingItem2DetailsInput,
    DeleteGroupingItem2DetailsInput
> {
    constructor(@InjectModel(GroupingItem2Details.name) resourceModel: Model<GroupingItemDetailsDocument>) {
        super(resourceModel)
    }
}
