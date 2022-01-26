import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateMirrorWordInput extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string

    @Field()
    @IsNotEmpty()
    word: string

    updatedAt?: Date
}
