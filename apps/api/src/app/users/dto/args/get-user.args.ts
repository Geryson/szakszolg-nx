import { ArgsType, Field } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { GqlArg } from '../../../../shared/gql-args/gql-arg.abstract'

@ArgsType()
export class GetUserArgs extends GqlArg {
    @Field({ nullable: true })
    @IsOptional()
    id?: string

    @Field({ nullable: true })
    @IsOptional()
    email?: string
}
