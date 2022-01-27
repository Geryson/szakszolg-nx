import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'
import { IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { CreateQuizQuestionInput } from '../../../quiz-question/dto/inputs/create-quiz-question.input'

@InputType()
export class CreateQuizInput extends GqlInput {
    @Field()
    title: string

    @Field()
    description: string

    @Field(() => [String])
    categories: string[]

    @Field(() => [CreateQuizQuestionInput])
    questions: IQuizQuestion[]
}
