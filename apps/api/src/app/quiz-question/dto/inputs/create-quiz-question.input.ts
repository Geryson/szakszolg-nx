import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreateQuizQuestionInput extends GqlInput {
    @Field()
    question: string

    @Field()
    type: string

    @Field(() => [String], { nullable: 'itemsAndList' })
    answers?: string[]

    @Field(() => [String], { nullable: 'itemsAndList' })
    correctAnswers?: string[]
}
