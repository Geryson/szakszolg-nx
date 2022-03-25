import { Field, InputType, Int } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreateQuizAnswerInput extends GqlInput {
    @Field()
    quizId: string

    @Field({ nullable: true })
    token: string | null

    @Field(() => Int)
    questionId: number

    @Field()
    answer: string

    @Field()
    om: string

    @Field()
    answeredAt?: Date

    @Field({ nullable: true })
    isCorrect?: boolean | null
}
