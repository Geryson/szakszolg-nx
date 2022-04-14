import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreateGroupingItem2DetailsInput extends GqlInput {
    @Field()
    name: string

    @Field()
    isPicture: boolean
}
