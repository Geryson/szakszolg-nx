import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdateQuizAnswerInput extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field({ nullable: true })
    quizId?: string

    @Field(() => Int, { nullable: true })
    questionId?: number

    @Field({ nullable: true })
    answer?: string

    @Field({ nullable: true })
    om?: string

    @Field({ nullable: true })
    answeredAt?: Date

    updatedAt?: Date
}
