import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IQuizAnswerOption, IUpdatedAt } from '@szakszolg-nx/api-interfaces'
import { UpdateQuizAnswerOptionInput } from '../../../quiz-answer-option/dto/inputs/update-quiz-answer-option.input'

@InputType()
export class UpdateQuizQuestionInput extends IdInput implements IUpdatedAt {
    @Field({ nullable: true })
    _id: number

    @Field({ nullable: true })
    question: string

    @Field({ nullable: true })
    type: string

    @Field(() => [UpdateQuizAnswerOptionInput], { nullable: 'itemsAndList' })
    answers?: IQuizAnswerOption[]

    updatedAt?: Date
}
