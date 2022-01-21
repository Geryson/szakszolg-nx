import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    id: string

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
}
