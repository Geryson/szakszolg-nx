import { Field, ObjectType } from '@nestjs/graphql'
import { I__PascalCase__ } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type __PascalCase__Document = I__PascalCase__ & Document

@ObjectType()
@Schema()
export class __PascalCase__ implements I__PascalCase__ {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    // TODO: Implement Entity

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

export const __PascalCase__Schema = SchemaFactory.createForClass(__PascalCase__)
