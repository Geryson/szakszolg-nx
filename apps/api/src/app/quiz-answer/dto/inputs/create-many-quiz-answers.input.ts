import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'
import { CreateQuizAnswerInput } from './create-quiz-answer.input'

@InputType()
export class CreateManyQuizAnswersInput extends GqlInput {
    @Field(() => [CreateQuizAnswerInput])
    answers: CreateQuizAnswerInput[]
}
