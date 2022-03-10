import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreatePuzzleInput extends GqlInput {
    @Field()
    url: string

    @Field()
    columns: number

    @Field()
    cropHeight: number

    @Field()
    cropWidth: number

    @Field()
    cropLeft: number

    @Field()
    cropTop: number

    @Field()
    pieceSize: number
}
