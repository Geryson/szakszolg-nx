import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IQuizAnswer } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

export type QuizAnswerDocument = IQuizAnswer & Document

@ObjectType()
@Schema()
export class QuizAnswer implements IQuizAnswer {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    quizId: string

    @Field({ nullable: true })
    @Prop({ nullable: true })
    token?: string | null

    @Field(() => Int)
    @Prop()
    questionId: number

    @Field()
    @Prop()
    answer: string

    @Field()
    @Prop()
    om: string

    @Field(() => Boolean, { nullable: true })
    @Prop({ nullable: true })
    isCorrect?: boolean | null

    @Field()
    @Prop()
    answeredAt?: Date

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

export const QuizAnswerSchema = SchemaFactory.createForClass(QuizAnswer)
