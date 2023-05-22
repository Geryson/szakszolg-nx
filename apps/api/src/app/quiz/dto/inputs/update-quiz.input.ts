import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IQuizQuestion, IUpdatedAt } from '@szakszolg-nx/api-interfaces'
import { UpdateQuizQuestionInput } from '../../../quiz-question/dto/inputs/update-quiz-question.input'

@InputType()
export class UpdateQuizInput extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field({ nullable: true })
    title: string

    @Field({ nullable: true })
    description: string

    @Field(() => [String], { nullable: 'itemsAndList' })
    categories: string[]

    @Field(() => [UpdateQuizQuestionInput], { nullable: 'itemsAndList' })
    questions: IQuizQuestion[]

    updatedAt?: Date

    @Field()
    useCategoryAverage: boolean
}
