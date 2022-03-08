import { Injectable, Logger } from '@nestjs/common'
import { CreatePuzzleInput } from './dto/inputs/create-puzzle.input'
import { UpdatePuzzleInput } from './dto/inputs/update-puzzle.input'
import { PuzzleRepository } from './entities/puzzle.repository'
import { GetPuzzlesArgs } from './dto/args/get-puzzles.args'
import { GetPuzzleArgs } from './dto/args/get-puzzle.args'
import { DeletePuzzleInput } from './dto/inputs/delete-puzzle.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'
import { PuzzleUrlInput } from './dto/inputs/puzzle-url.input'
import { unlink } from 'fs/promises'
import { UPLOAD_PATH } from '../../utils/constants'
import { IPuzzle } from '@szakszolg-nx/api-interfaces'

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

    createMany(data: PuzzleUrlInput) {
        return this.repository.createMany(data)
    }

    async delete(data: DeletePuzzleInput) {
        try {
            const res: Partial<IPuzzle> = await super.delete(data)
            Logger.log(`Deleting file ${res.url}`)
            await unlink(`${UPLOAD_PATH}/${res.url}`)
            return res
        } catch (error) {
            Logger.error(error)
            throw new Error(error)
        }
    }
}
