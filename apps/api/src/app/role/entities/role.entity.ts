import { Field, ObjectType } from '@nestjs/graphql'
import { IRole } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type RoleDocument = IRole & Document

@ObjectType()
@Schema()
export class Role implements IRole {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    description: string

    @Field()
    @Prop()
    name: string

    @Field(() => [String])
    @Prop({ type: [String] })
    permissions: string[]

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

export const RoleSchema = SchemaFactory.createForClass(Role)
