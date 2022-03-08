import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PuzzleService } from './puzzle.service'
import { Puzzle } from './entities/puzzle.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetPuzzleArgs } from './dto/args/get-puzzle.args'
import { IPuzzle } from '@szakszolg-nx/api-interfaces'
import { GetPuzzlesArgs } from './dto/args/get-puzzles.args'
import { CreatePuzzleInput } from './dto/inputs/create-puzzle.input'
import { UpdatePuzzleInput } from './dto/inputs/update-puzzle.input'
import { DeletePuzzleInput } from './dto/inputs/delete-puzzle.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'
import { PuzzleUrlInput } from './dto/inputs/puzzle-url.input'

@Resolver(() => Puzzle)
@Resource('puzzles')
export class PuzzleResolver {
    constructor(private readonly service: PuzzleService) {}

    @Query(() => Puzzle, { nullable: true })
    puzzle(@Args({ nullable: true }) data: GetPuzzleArgs): Promise<IPuzzle> {
        return this.service.findOne(data)
    }

    @Query(() => [Puzzle], { nullable: 'items' })
    puzzles(@Args({ nullable: true }) data: GetPuzzlesArgs | null): Promise<IPuzzle[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => [Puzzle], { nullable: 'items' })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createManyPuzzles(@Args('data') data: PuzzleUrlInput): Promise<IPuzzle[]> {
        return this.service.createMany(data)
    }

    @Mutation(() => Puzzle)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createPuzzle(@Args('createPuzzleData') data: CreatePuzzleInput): Promise<IPuzzle> {
        return this.service.create(data)
    }

    @Mutation(() => Puzzle)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updatePuzzle(@Args('updatePuzzleData') data: UpdatePuzzleInput): Promise<IPuzzle> {
        return this.service.update(data)
    }

    @Mutation(() => Puzzle)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deletePuzzle(@Args('deletePuzzleData') data: DeletePuzzleInput): Promise<IPuzzle> {
        return this.service.delete(data)
    }
}
