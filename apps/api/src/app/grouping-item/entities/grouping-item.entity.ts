import { Field, ObjectType } from '@nestjs/graphql'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type GroupingItemDocument = IGroupingItem & Document

@ObjectType()
@Schema()
export class GroupingItem implements IGroupingItem {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    item: string

    @Field(() => [String])
    @Prop({ type: [String] })
    groups: string[]

    @Field()
    @Prop()
    correct: string

    @Field()
    @Prop()
    createdAt: Date

    @Field()
    @Prop()
    updatedAt?: Date

    @Field({ nullable: true })
    @Prop()
    deletedAt?: Date
}

export const GroupingItemSchema = SchemaFactory.createForClass(GroupingItem)
