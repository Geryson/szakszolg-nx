import { IdArg } from '../../../../shared/gql-args/id.args'
import { ArgsType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@ArgsType()
export class Get__PascalCase__Args extends IdArg {
    @Field()
    @IsNotEmpty()
    id: string
}
