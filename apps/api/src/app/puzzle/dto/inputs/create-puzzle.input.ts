import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreatePuzzleInput extends GqlInput {
    @Field()
    url: string
}
