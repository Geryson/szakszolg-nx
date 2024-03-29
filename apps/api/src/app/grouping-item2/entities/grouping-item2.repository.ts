import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { GroupingItem2, GroupingItemDocument } from './grouping-item2.entity'
import { Model } from 'mongoose'
import { UpdateGroupingItem2Input } from '../dto/inputs/update-grouping-item2.input'
import { CreateGroupingItem2Input } from '../dto/inputs/create-grouping-item2.input'
import { GetGroupingItems2Args } from '../dto/args/get-grouping-items2.args'
import { GetGroupingItem2Args } from '../dto/args/get-grouping-item2.args'
import {IGroupingItem2} from '@szakszolg-nx/api-interfaces'
import { DeleteGroupingItem2Input } from '../dto/inputs/delete-grouping-item2.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class GroupingItem2Repository extends SimpleRepository<
    GroupingItemDocument,
    IGroupingItem2,
    GetGroupingItem2Args,
    GetGroupingItems2Args,
    CreateGroupingItem2Input,
    UpdateGroupingItem2Input,
    DeleteGroupingItem2Input
> {
    constructor(@InjectModel(GroupingItem2.name) resourceModel: Model<GroupingItemDocument>) {
        super(resourceModel)
    }

    override async findAll(data: GetGroupingItems2Args | null): Promise<IGroupingItem2[]> {
        if (!data?.category && !data?.ids) return super.findAll(data)
        let res: any[]
        const param = {}
        if (data.category) param['category'] = { $regex: data.category, $options: 'i' }
        res = await this.model.find(param)
        if (data.ids?.length > 0) res = res.filter((x) => data.ids.includes(x._id.toString()))
        return res
    }

    override async findOne(data: GetGroupingItem2Args): Promise<IGroupingItem2> {
        if (data.id) return super.findOne(data)

        if (data?.category) {
            const rawCategory = data.category
            const formattedCategory = rawCategory.replace(/\(/g, "\\(").replace(/\)/g, "\\)")
                .replace(/\[/g, "\\[").replace(/]/g, "\\]").replace(/\?/g, "\\?")
                .replace(/\./g, "\\.")
            const regexName = new RegExp(formattedCategory, "i")
            const res = await this.model.find({ category: { $regex: regexName } })
            return res[Math.floor(Math.random() * res.length)]
        }

        const count = await this.model.estimatedDocumentCount()
        const random = Math.floor(Math.random() * count)
        return this.model.findOne().skip(random).limit(1)
    }
}
