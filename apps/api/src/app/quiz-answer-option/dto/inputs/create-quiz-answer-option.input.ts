import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreateQuizAnswerOptionInput extends GqlInput {
    @Field({ nullable: true })
    categoryIndex?: number

    @Field({ nullable: true })
    isCorrect?: boolean

    @Field()
    text: string
}
