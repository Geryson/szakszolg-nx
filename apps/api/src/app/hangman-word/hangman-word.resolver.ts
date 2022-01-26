import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { HangmanWordService } from './hangman-word.service'
import { HangmanWord } from './entities/hangman-word.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetHangmanWordArgs } from './dto/args/get-hangman-word.args'
import { IHangmanWord } from '@szakszolg-nx/api-interfaces'
import { GetHangmanWordsArgs } from './dto/args/get-hangman-words.args'
import { CreateHangmanWordInput } from './dto/inputs/create-hangman-word.input'
import { UpdateHangmanWordInput } from './dto/inputs/update-hangman-word.input'
import { DeleteHangmanWordInput } from './dto/inputs/delete-hangman-word.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => HangmanWord)
@Resource('hangman-words')
export class HangmanWordResolver {
    constructor(private readonly service: HangmanWordService) {}

    @Query(() => HangmanWord, { nullable: true, description: 'Get a hangman word randomly' })
    hangmanWord(@Args({ nullable: true }) data: GetHangmanWordArgs): Promise<IHangmanWord> {
        return this.service.findOne(data)
    }

    @Query(() => [HangmanWord], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    hangmanWords(@Args({ nullable: true }) data: GetHangmanWordsArgs | null): Promise<IHangmanWord[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => HangmanWord)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createHangmanWord(@Args('createHangmanWordData') data: CreateHangmanWordInput): Promise<IHangmanWord> {
        return this.service.create(data)
    }

    @Mutation(() => HangmanWord)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateHangmanWord(@Args('updateHangmanWordData') data: UpdateHangmanWordInput): Promise<IHangmanWord> {
        return this.service.update(data)
    }

    @Mutation(() => HangmanWord)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteHangmanWord(@Args('deleteHangmanWordData') data: DeleteHangmanWordInput): Promise<IHangmanWord> {
        return this.service.delete(data)
    }
}
