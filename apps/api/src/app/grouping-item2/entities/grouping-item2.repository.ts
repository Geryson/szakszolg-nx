import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { GroupingItem2, GroupingItemDocument } from './grouping-item2.entity'
import { Model } from 'mongoose'
import { UpdateGroupingItem2Input } from '../dto/inputs/update-grouping-item2.input'
import { CreateGroupingItem2Input } from '../dto/inputs/create-grouping-item2.input'
import { GetGroupingItems2Args } from '../dto/args/get-grouping-items2.args'
import { GetGroupingItem2Args } from '../dto/args/get-grouping-item2.args'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { DeleteGroupingItem2Input } from '../dto/inputs/delete-grouping-item2.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class GroupingItem2Repository extends SimpleRepository<
    GroupingItemDocument,
    IGroupingItem,
    GetGroupingItem2Args,
    GetGroupingItems2Args,
    CreateGroupingItem2Input,
    UpdateGroupingItem2Input,
    DeleteGroupingItem2Input
> {
    constructor(@InjectModel(GroupingItem2.name) resourceModel: Model<GroupingItemDocument>) {
        super(resourceModel)
    }

    override async findOne(__data: GetGroupingItem2Args): Promise<IGroupingItem> {
        const count = await this.model.estimatedDocumentCount()
        const random = Math.floor(Math.random() * count)
        return this.model.findOne().skip(random).limit(1)
    }
}
