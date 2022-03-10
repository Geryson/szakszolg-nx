import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IQuizAnswerOption } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type QuizAnswerOptionDocument = IQuizAnswerOption & Document

@ObjectType()
@Schema()
export class QuizAnswerOption implements IQuizAnswerOption {
    @Field(() => Int)
    @Prop({ type: MongooseSchema.Types.Mixed })
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

    @Field({ nullable: true })
    @Prop()
    categoryIndex?: number

    @Field({ nullable: true })
    @Prop()
    isCorrect?: boolean

    @Field()
    @Prop()
    text: string
}

export const QuizAnswerOptionSchema = SchemaFactory.createForClass(QuizAnswerOption)
