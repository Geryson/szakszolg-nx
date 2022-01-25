import { IdInput } from '../../../../shared/gql-inputs/id.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator'
import { IUpdatedAt } from '@szakszolg-nx/api-interfaces'

@InputType()
export class Update__PascalCase__Input extends IdInput implements IUpdatedAt {

    // TODO: Implement based on create input

    updatedAt?: Date
}
