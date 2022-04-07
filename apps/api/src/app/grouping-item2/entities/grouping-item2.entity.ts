import { Field, ObjectType } from '@nestjs/graphql'
import { IGroupingItem2 } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type GroupingItemDocument = IGroupingItem2 & Document

@ObjectType()
@Schema()
export class GroupingItem2 implements IGroupingItem2 {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    category: string

    @Field(() => [String])
    @Prop({ type: [String] })
    items: string[]

    @Field(() => [String])
    @Prop({ type: [String] })
    groups: string[]

    @Field(() => [String])
    @Prop({ type: [String] })
    correct: string[]

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

export const GroupingItemSchema2 = SchemaFactory.createForClass(GroupingItem2)
