import { Field, ObjectType } from '@nestjs/graphql'
import { IQuiz, IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'
import { QuizQuestion } from '../../quiz-question/entities/quiz-question.entity'

export type QuizDocument = IQuiz & Document

@ObjectType()
@Schema()
export class Quiz implements IQuiz {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    title: string

    @Field()
    @Prop()
    template: string

    @Field()
    @Prop()
    description: string

    @Field(() => [String])
    @Prop({ type: [String] })
    categories: string[]

    @Field(() => [QuizQuestion])
    @Prop({ type: [MongooseSchema.Types.Mixed] })
    questions: IQuizQuestion[]

    @Field(() => [String])
    @Prop({ type: [String] })
    tokens: string[]

    @Field()
    @Prop()
    useCategoryAverage: boolean

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

export const QuizSchema = SchemaFactory.createForClass(Quiz)
