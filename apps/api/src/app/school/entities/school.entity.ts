import { Field, ObjectType } from '@nestjs/graphql'
import { ISchool } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type SchoolDocument = ISchool & Document

@ObjectType()
@Schema()
export class School implements ISchool {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    om: string

    @Field()
    @Prop()
    name: string

    @Field()
    @Prop()
    address: string

    @Field()
    @Prop()
    county: string

    @Field(() => [String])
    @Prop({ type: [String] })
    types: string[]

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

export const SchoolSchema = SchemaFactory.createForClass(School)
