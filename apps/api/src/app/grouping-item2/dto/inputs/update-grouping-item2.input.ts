import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IUpdatedAt} from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdateGroupingItem2Input extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field({nullable: true})
    category?: string

    @Field(() => [String],{ nullable: true })
    items?: string[]


    @Field(() => [Boolean],{ nullable: true })
    itemIsPicture?: boolean[]


    @Field(() => [String], { nullable: 'itemsAndList' })
    groups?: string[]


    @Field(() => [Boolean], { nullable: 'itemsAndList' })
    groupIsPicture?: boolean[]


    @Field(() => [String],{ nullable: true })
    correct?: string[]


    @Field(() => [Boolean], { nullable: 'itemsAndList' })
    correctIsPicture?: boolean[]

    updatedAt?: Date
}
