import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdateQuizAnswerOptionInput extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    _id: number

    @Field({ nullable: true })
    categoryIndex?: number

    @Field({ nullable: true })
    isCorrect?: boolean

    @Field({ nullable: true })
    text?: string

    updatedAt?: Date
}
