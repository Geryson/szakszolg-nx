import { Field } from '@nestjs/graphql'
import { IsArray, IsNotEmpty } from 'class-validator'
import { GqlArg } from './gql-arg.abstract'

export class IdArrayArg extends GqlArg {
    @Field(() => [String], { nullable: true })
    @IsArray()
    ids?: string[]
}

export class IdArg extends GqlArg {
    @Field()
    @IsNotEmpty()
    id: string
}
