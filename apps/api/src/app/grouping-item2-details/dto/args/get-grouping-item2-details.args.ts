import { IdArg } from '../../../../shared/gql-args/id.args'
import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class GetGroupingItem2DetailsArgs extends IdArg {
    @Field({ nullable: true })
    id: string
}
