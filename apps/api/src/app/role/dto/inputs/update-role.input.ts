import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdateRoleInput extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    name?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    description?: string

    @Field(() => [String], { nullable: 'itemsAndList' })
    @IsOptional()
    @IsArray()
    permissions?: string[]

    updatedAt?: Date
}
