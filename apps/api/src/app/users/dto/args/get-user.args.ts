import { ArgsType, Field } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@ArgsType()
export class GetUserArgs {
    @Field({ nullable: true })
    @IsOptional()
    id?: string

    @Field({ nullable: true })
    @IsOptional()
    email?: string
}
