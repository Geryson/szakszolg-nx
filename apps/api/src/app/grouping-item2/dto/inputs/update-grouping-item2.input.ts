import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import {IGroupingItem2Details, IUpdatedAt} from '@szakszolg-nx/api-interfaces'
import {
    UpdateGroupingItem2DetailsInput
} from "../../../grouping-item2-details/dto/inputs/update-grouping-item2-details.input";

@InputType()
export class UpdateGroupingItem2Input extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field({nullable: true})
    category?: string

    @Field(() => [UpdateGroupingItem2DetailsInput],{ nullable: true })
    items?: IGroupingItem2Details[]

    /*
    @Field(() => [Boolean],{ nullable: true })
    itemIsPicture?: boolean[]
     */

    @Field(() => [UpdateGroupingItem2DetailsInput], { nullable: 'itemsAndList' })
    groups?: IGroupingItem2Details[]

    /*
    @Field(() => [Boolean], { nullable: 'itemsAndList' })
    groupIsPicture?: boolean[]
     */

    @Field(() => [String],{ nullable: true })
    correct?: string[]

    updatedAt?: Date
}
