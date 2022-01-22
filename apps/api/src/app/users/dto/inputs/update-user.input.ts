import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdateUserInput extends IdInput implements IUpdatedAt {
    @Field({ nullable: true })
    @IsEmail()
    email?: string

    @Field({ nullable: true })
    username?: string

    @Field()
    @IsNotEmpty()
    password: string

    @Field({ nullable: true })
    newPassword?: string

    @Field({ nullable: true })
    newPasswordConfirm?: string

    @Field({ nullable: true })
    om?: string

    updatedAt?: Date
}
