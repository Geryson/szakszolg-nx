import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty } from 'class-validator'
import { GqlInput } from '../../../../shared/gql-inputs/gql-input.abstract'

@InputType()
export class Create__PascalCase__Input extends GqlInput {
    // TODO: Implement
}
