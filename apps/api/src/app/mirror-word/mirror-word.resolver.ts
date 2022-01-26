import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { MirrorWordService } from './mirror-word.service'
import { MirrorWord } from './entities/mirror-word.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetMirrorWordArgs } from './dto/args/get-mirror-word.args'
import { IMirrorWord } from '@szakszolg-nx/api-interfaces'
import { GetMirrorWordsArgs } from './dto/args/get-mirror-words.args'
import { CreateMirrorWordInput } from './dto/inputs/create-mirror-word.input'
import { UpdateMirrorWordInput } from './dto/inputs/update-mirror-word.input'
import { DeleteMirrorWordInput } from './dto/inputs/delete-mirror-word.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => MirrorWord)
@Resource('mirror-words')
export class MirrorWordResolver {
    constructor(private readonly mirrorWordService: MirrorWordService) {}

    @Query(() => MirrorWord, { nullable: true })
    mirrorWord(@Args({ nullable: true }) data: GetMirrorWordArgs): Promise<IMirrorWord> {
        return this.mirrorWordService.findOne(data)
    }

    @Query(() => [MirrorWord], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    mirrorWords(@Args({ nullable: true }) data: GetMirrorWordsArgs | null): Promise<IMirrorWord[]> {
        return this.mirrorWordService.findAll(data)
    }

    @Mutation(() => MirrorWord)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createMirrorWord(@Args('createMirrorWordData') data: CreateMirrorWordInput): Promise<IMirrorWord> {
        return this.mirrorWordService.create(data)
    }

    @Mutation(() => MirrorWord)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateMirrorWord(@Args('updateMirrorWordData') data: UpdateMirrorWordInput): Promise<IMirrorWord> {
        return this.mirrorWordService.update(data)
    }

    @Mutation(() => MirrorWord)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteMirrorWord(@Args('deleteMirrorWordData') data: DeleteMirrorWordInput): Promise<IMirrorWord> {
        return this.mirrorWordService.delete(data)
    }
}
