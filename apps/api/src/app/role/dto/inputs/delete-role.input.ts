import { Field, InputType } from '@nestjs/graphql'
import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class DeleteRoleInput extends IdInput {
    @Field()
    @IsNotEmpty()
    id: string
}
