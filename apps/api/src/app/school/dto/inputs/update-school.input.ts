import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional } from 'class-validator'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdateSchoolInput extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field({ nullable: true })
    om?: string

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    address?: string

    @Field({ nullable: true })
    county?: string

    @Field(() => [String], { nullable: 'itemsAndList' })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    types?: string[]

    updatedAt?: Date
}
