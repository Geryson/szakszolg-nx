import { IdArrayArg } from '../../../../shared/gql-args/id.args'
import { ArgsType, Field } from '@nestjs/graphql'
import { IsArray } from 'class-validator'

@ArgsType()
export class GetQuizzesArgs extends IdArrayArg {
    @Field(() => [String], { nullable: true })
    @IsArray()
    ids?: string[]

    @Field()
    category?: string
}
