import { Field, ObjectType } from '@nestjs/graphql'
import { IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type QuizQuestionDocument = IQuizQuestion & Document

@ObjectType()
@Schema()
export class QuizQuestion implements IQuizQuestion {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    question: string

    @Field()
    @Prop()
    type: string

    @Field(() => [String], { nullable: 'itemsAndList' })
    @Prop({ type: [String] })
    answers?: string[]

    @Field(() => [String], { nullable: 'itemsAndList' })
    @Prop({ type: [String] })
    correctAnswers?: string[]

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

export const QuizQuestionSchema = SchemaFactory.createForClass(QuizQuestion)
