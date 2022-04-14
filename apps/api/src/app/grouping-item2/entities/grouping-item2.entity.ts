import { Field, ObjectType } from '@nestjs/graphql'
import {IGroupingItem2, IGroupingItem2Details} from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'
import {GroupingItem2Details} from "../../grouping-item2-details/entities/grouping-item2-details.entity";

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

    @Field(() => [GroupingItem2Details])
    @Prop({ type: [MongooseSchema.Types.Mixed] })
    items: IGroupingItem2Details[]

    /*
    @Field(() => [Boolean])
    @Prop({ type: [Boolean] })
    itemIsPicture: boolean[]
     */

    @Field(() => [GroupingItem2Details])
    @Prop({ type: [MongooseSchema.Types.Mixed] })
    groups: IGroupingItem2Details[]

    /*
    @Field(() => [Boolean])
    @Prop({ type: [Boolean] })
    groupIsPicture: boolean[]
    */

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

export const GroupingItem2Schema = SchemaFactory.createForClass(GroupingItem2)
