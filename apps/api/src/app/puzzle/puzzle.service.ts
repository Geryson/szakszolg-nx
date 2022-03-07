import { Injectable } from '@nestjs/common'
import { CreatePuzzleInput } from './dto/inputs/create-puzzle.input'
import { UpdatePuzzleInput } from './dto/inputs/update-puzzle.input'
import { PuzzleRepository } from './entities/puzzle.repository'
import { GetPuzzlesArgs } from './dto/args/get-puzzles.args'
import { GetPuzzleArgs } from './dto/args/get-puzzle.args'
import { DeletePuzzleInput } from './dto/inputs/delete-puzzle.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class PuzzleService extends RepositoryProxyService<
    PuzzleRepository,
    GetPuzzleArgs,
    GetPuzzlesArgs,
    CreatePuzzleInput,
    UpdatePuzzleInput,
    DeletePuzzleInput
> {
    constructor(repository: PuzzleRepository) {
        super(repository)
    }
}
