import { IdArg } from '../../../../shared/gql-args/id.args'
import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class GetHangmanWordArgs extends IdArg {
    @Field({ nullable: true })
    id: string

    @Field({ nullable: true })
    category?: string
}
