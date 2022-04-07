import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdateGroupingItem2Input extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field({ nullable: true })
    item?: string

    @Field(() => [String], { nullable: 'itemsAndList' })
    groups?: string[]

    @Field({ nullable: true })
    correct?: string

    updatedAt?: Date
}
