import { IdArrayArg } from '../../../../shared/gql-args/id.args'
import { ArgsType, Field } from '@nestjs/graphql'
import { IsArray } from 'class-validator'

@ArgsType()
export class GetSchoolsArgs extends IdArrayArg {
    @Field(() => [String], { nullable: true })
    @IsArray()
    ids?: string[]

    @Field({ nullable: true })
    om?: string

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    address?: string

    @Field({ nullable: true })
    county?: string

    @Field({ nullable: true })
    type: string
}
