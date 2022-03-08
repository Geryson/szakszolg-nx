import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class UpdatePuzzleInput extends IdInput implements IUpdatedAt {
    @Field()
    @IsNotEmpty()
    id: string
    @Field()
    url: string

    @Field({ nullable: true })
    columns?: number

    @Field({ nullable: true })
    cropHeight?: number

    @Field({ nullable: true })
    cropWidth?: number

    @Field({ nullable: true })
    cropLeft?: number

    @Field({ nullable: true })
    cropTop?: number

    @Field({ nullable: true })
    pieceSize?: number

    updatedAt?: Date
}
