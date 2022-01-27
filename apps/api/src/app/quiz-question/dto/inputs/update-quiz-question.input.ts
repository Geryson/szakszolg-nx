import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdateQuizQuestionInput extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field({ nullable: true })
    question: string

    @Field({ nullable: true })
    type: string

    @Field(() => [String], { nullable: 'itemsAndList' })
    answers?: string[]

    @Field(() => [String], { nullable: 'itemsAndList' })
    correctAnswers?: string[]

    updatedAt?: Date
}
