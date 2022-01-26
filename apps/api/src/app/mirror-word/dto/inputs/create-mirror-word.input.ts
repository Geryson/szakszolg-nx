import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreateMirrorWordInput extends GqlInput {
    @Field()
    @IsNotEmpty()
    public word: string
}
