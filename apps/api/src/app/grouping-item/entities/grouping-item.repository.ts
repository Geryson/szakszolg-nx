import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { GroupingItem, GroupingItemDocument } from './grouping-item.entity'
import { Model } from 'mongoose'
import { UpdateGroupingItemInput } from '../dto/inputs/update-grouping-item.input'
import { CreateGroupingItemInput } from '../dto/inputs/create-grouping-item.input'
import { GetGroupingItemsArgs } from '../dto/args/get-grouping-items.args'
import { GetGroupingItemArgs } from '../dto/args/get-grouping-item.args'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { DeleteGroupingItemInput } from '../dto/inputs/delete-grouping-item.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class GroupingItemRepository extends SimpleRepository<
    GroupingItemDocument,
    IGroupingItem,
    GetGroupingItemArgs,
    GetGroupingItemsArgs,
    CreateGroupingItemInput,
    UpdateGroupingItemInput,
    DeleteGroupingItemInput
> {
    constructor(@InjectModel(GroupingItem.name) resourceModel: Model<GroupingItemDocument>) {
        super(resourceModel)
    }

    override async findOne(__data: GetGroupingItemArgs): Promise<IGroupingItem> {
        const count = await this.model.estimatedDocumentCount()
        const random = Math.floor(Math.random() * count)
        return this.model.findOne().skip(random).limit(1)
    }
}
