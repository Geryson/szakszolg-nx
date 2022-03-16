import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'
import { IQuizAnswerOption } from '@szakszolg-nx/api-interfaces'
import { CreateQuizAnswerOptionInput } from '../../../quiz-answer-option/dto/inputs/create-quiz-answer-option.input'

@InputType()
export class CreateQuizQuestionInput extends GqlInput {
    @Field()
    _id: number

    @Field()
    question: string

    @Field({ nullable: true })
    categoryIndex?: number

    @Field()
    type: string

    @Field(() => [CreateQuizAnswerOptionInput], { nullable: 'itemsAndList' })
    answers?: IQuizAnswerOption[]
}
