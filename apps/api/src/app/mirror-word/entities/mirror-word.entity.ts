import { Field, ObjectType } from '@nestjs/graphql'
import { IMirrorWord } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type MirrorWordDocument = IMirrorWord & Document

@ObjectType()
@Schema()
export class MirrorWord implements IMirrorWord {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    word: string

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

export const MirrorWordSchema = SchemaFactory.createForClass(MirrorWord)
