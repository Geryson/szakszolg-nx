import { Field, InputType } from '@nestjs/graphql'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'
import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateSchoolInput extends GqlInput {
    @Field()
    @IsNotEmpty()
    om: string

    @Field()
    @IsNotEmpty()
    name: string

    @Field()
    @IsNotEmpty()
    address: string

    @Field()
    @IsNotEmpty()
    county: string

    @Field(() => [String])
    @IsArray()
    @ArrayNotEmpty()
    types: string[]
}
