import { Field, ObjectType } from '@nestjs/graphql'
import { IHangmanWord } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type HangmanWordDocument = IHangmanWord & Document

@ObjectType()
@Schema()
export class HangmanWord implements IHangmanWord {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    word: string

    @Field()
    @Prop()
    category: string

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

export const HangmanWordSchema = SchemaFactory.createForClass(HangmanWord)
