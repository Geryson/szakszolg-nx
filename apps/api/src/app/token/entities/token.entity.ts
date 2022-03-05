import { Field, ObjectType } from '@nestjs/graphql'
import { IQuiz, IToken } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document, Types } from 'mongoose'
import { Quiz } from '../../quiz/entities/quiz.entity'

export type TokenDocument = IToken & Document

@ObjectType()
@Schema()
export class Token implements IToken {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field(() => String)
    @Prop()
    token: string

    @Field(() => Quiz)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Quiz.name })
    quiz: Types.ObjectId | IQuiz

    @Field(() => Date)
    @Prop({ type: Date })
    expiresAt: Date

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

export const TokenSchema = SchemaFactory.createForClass(Token)
