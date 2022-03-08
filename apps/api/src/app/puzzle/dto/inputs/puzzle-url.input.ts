import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class PuzzleUrlInput extends GqlInput {
    @Field(() => [String])
    urls: string[]
}
