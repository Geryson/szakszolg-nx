import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreateGroupingItem2Input extends GqlInput {
    @Field()
    category: string

    @Field(() => [String])
    items: string[]


    @Field(() => [Boolean])
    itemIsPicture: boolean[]


    @Field(() => [String])
    groups: string[]


    @Field(() => [Boolean])
    groupIsPicture: boolean[]


    @Field(() => [String])
    correct: string[]

    @Field(() => [Boolean])
    correctIsPicture: boolean[]
}
