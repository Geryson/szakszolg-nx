import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IdInput } from '../../../../shared/gql-inputs/id.input'

@InputType()
export class CreateTokenInput extends IdInput {
    @Field()
    @IsNotEmpty()
    quizId: string

    @Field(() => Int, { nullable: true, description: 'The token lifetime in seconds' })
    expiresIn: number
}
