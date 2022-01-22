import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class CreateUserInput extends GqlInput {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Field()
    @IsNotEmpty()
    username: string

    @Field()
    @IsNotEmpty()
    password: string

    @Field()
    om?: string
}
