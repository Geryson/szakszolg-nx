import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'
import {IGroupingItem2Details} from "@szakszolg-nx/api-interfaces";
import {
    CreateGroupingItem2DetailsInput
} from "../../../grouping-item2-details/dto/inputs/create-grouping-item2-details.input";

@InputType()
export class CreateGroupingItem2Input extends GqlInput {
    @Field()
    category: string

    @Field(() => [CreateGroupingItem2DetailsInput])
    items: IGroupingItem2Details[]

    /*
    @Field(() => [Boolean])
    itemIsPicture: boolean[]
     */

    @Field(() => [CreateGroupingItem2DetailsInput])
    groups: IGroupingItem2Details[]

    /*
    @Field(() => [Boolean])
    groupIsPicture: boolean[]
     */

    @Field(() => [String])
    correct: string[]
}
