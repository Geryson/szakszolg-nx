import { Field, ObjectType } from '@nestjs/graphql'
import { IPuzzle } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type PuzzleDocument = IPuzzle & Document

@ObjectType()
@Schema()
export class Puzzle implements IPuzzle {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    createdAt: Date

    @Field()
    @Prop()
    updatedAt?: Date

    @Field({ nullable: true })
    @Prop()
    deletedAt?: Date

    @Field()
    @Prop()
    columns: number

    @Field()
    @Prop()
    cropHeight: number

    @Field()
    @Prop()
    cropLeft: number

    @Field()
    @Prop()
    cropTop: number

    @Field()
    @Prop()
    cropWidth: number

    @Field()
    @Prop()
    pieceSize: number

    @Field()
    @Prop()
    url: string
}

export const PuzzleSchema = SchemaFactory.createForClass(Puzzle)
