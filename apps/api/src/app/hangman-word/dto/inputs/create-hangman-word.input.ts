import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateHangmanWordInput extends GqlInput {
    @Field()
    @IsNotEmpty()
    word: string

    @Field()
    @IsNotEmpty()
    category: string
}
