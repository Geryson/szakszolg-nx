import { ArgsType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { GqlArg } from '../../../../shared/gql-args/gql-arg.abstract'

@ArgsType()
export class GetTokenArgs extends GqlArg {
    @Field({ nullable: true })
    id: string

    @Field()
    @IsNotEmpty()
    token: string
}
