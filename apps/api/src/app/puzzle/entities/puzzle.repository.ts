import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Puzzle, PuzzleDocument } from './puzzle.entity'
import { Model } from 'mongoose'
import { UpdatePuzzleInput } from '../dto/inputs/update-puzzle.input'
import { CreatePuzzleInput } from '../dto/inputs/create-puzzle.input'
import { GetPuzzlesArgs } from '../dto/args/get-puzzles.args'
import { GetPuzzleArgs } from '../dto/args/get-puzzle.args'
import { IPuzzle } from '@szakszolg-nx/api-interfaces'
import { DeletePuzzleInput } from '../dto/inputs/delete-puzzle.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'
import { PuzzleUrlInput } from '../dto/inputs/puzzle-url.input'

@Injectable()
export class PuzzleRepository extends SimpleRepository<
    PuzzleDocument,
    IPuzzle,
    GetPuzzleArgs,
    GetPuzzlesArgs,
    CreatePuzzleInput,
    UpdatePuzzleInput,
    DeletePuzzleInput
> {
    constructor(@InjectModel(Puzzle.name) resourceModel: Model<PuzzleDocument>) {
        super(resourceModel)
    }

    createMany(data: PuzzleUrlInput) {
        return Promise.all(data.urls.map((d) => this.create({ url: d } as any)))
    }

    async delete(data: DeletePuzzleInput): Promise<IPuzzle> {
        return this.model.findByIdAndDelete(data.id, { deletedAt: Date.now() }) as any
    }
}
