import { Field, ObjectType } from '@nestjs/graphql'
import { IGroupingItem2Details } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type GroupingItemDetailsDocument = IGroupingItem2Details & Document

@ObjectType()
@Schema()
export class GroupingItem2Details implements IGroupingItem2Details {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    name: string

    @Field()
    @Prop()
    isPicture: boolean

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

export const GroupingItem2DetailsSchema = SchemaFactory.createForClass(GroupingItem2Details)
