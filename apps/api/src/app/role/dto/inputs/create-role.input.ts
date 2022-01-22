import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty } from 'class-validator'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreateRoleInput extends GqlInput {
    @Field()
    @IsNotEmpty()
    name: string

    @Field()
    @IsNotEmpty()
    description: string

    @Field(() => [String])
    @IsArray()
    permissions: string[]
}
