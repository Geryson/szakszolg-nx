import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Document, Model, Types } from 'mongoose'
import { IdArg, IdArrayArg } from '../gql-args/id.args'
import { IdInput } from '../gql-inputs/id.input'
import { IApiResource, IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@Injectable()
export class SimpleRepository<
    TDocument extends Document,
    TInterface extends IApiResource,
    TFindOneArgs extends IdArg,
    TFindManyArgs extends IdArrayArg,
    TCreateInput,
    TUpdateInput extends IdInput,
    TDeleteInput extends IdInput,
> {
    private softDelete = false
    constructor(protected readonly model: Model<TDocument>) {}

    public async findAll(data: TFindManyArgs | null): Promise<TInterface[]> {
        return data && Object.keys(data).length > 0
            ? Promise.all(data.ids.map((id) => this.findOne({ id } as TFindOneArgs)))
            : (this.model.find({ deletedAt: { $eq: null } }) as any)
    }

    public async findOne(data: TFindOneArgs): Promise<TInterface> {
        const res = this.model.findById(data.id) as any
        return res?.deletedAt
            ? Promise.reject(new NotFoundException(`Model with id ${data.id} not found or has been deleted`))
            : res
    }

    public async create(data: TCreateInput): Promise<TInterface> {
        return (await new this.model({
            ...data,
            _id: new Types.ObjectId(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        }).save()) as any
    }

    public async update(data: TUpdateInput & IUpdatedAt): Promise<TInterface> {
        const id = data.id
        delete data.id
        if ((data as any).deletedAt) return Promise.reject(new BadRequestException('Cannot update deleted resource'))
        data.updatedAt = new Date()
        return this.model.findByIdAndUpdate(id, data, { new: false }) as any
    }

    public async delete(data: TDeleteInput): Promise<TInterface> {
        return this.softDelete
            ? (this.model.findByIdAndUpdate(data.id, { deletedAt: Date.now() }, { new: true }) as any)
            : (this.model.findByIdAndDelete(data.id) as any)
    }
}
