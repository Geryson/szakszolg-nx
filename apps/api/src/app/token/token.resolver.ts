import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TokenService } from './token.service'
import { Token } from './entities/token.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetTokenArgs } from './dto/args/get-token.args'
import { IToken } from '@szakszolg-nx/api-interfaces'
import { GetTokensArgs } from './dto/args/get-tokens.args'
import { CreateTokenInput } from './dto/inputs/create-token.input'
import { UpdateTokenInput } from './dto/inputs/update-token.input'
import { DeleteTokenInput } from './dto/inputs/delete-token.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => Token)
@Resource('tokens')
export class TokenResolver {
    constructor(private readonly service: TokenService) {}

    @Query(() => Token, { nullable: true })
    token(@Args({ nullable: true }) data: GetTokenArgs): Promise<IToken> {
        return this.service.findOne(data)
    }

    @Query(() => [Token], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    tokens(@Args({ nullable: true }) data: GetTokensArgs | null): Promise<IToken[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => Token)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createToken(@Args('createTokenData') data: CreateTokenInput): Promise<IToken> {
        return this.service.create(data)
    }

    @Mutation(() => Token)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteToken(@Args('deleteTokenData') data: DeleteTokenInput): Promise<IToken> {
        return this.service.delete(data)
    }
}
