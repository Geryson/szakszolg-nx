import { Module } from '@nestjs/common'
import { PuzzleService } from './puzzle.service'
import { PuzzleResolver } from './puzzle.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Puzzle, PuzzleSchema } from './entities/puzzle.entity'
import { PuzzleRepository } from './entities/puzzle.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Puzzle.name,
                schema: PuzzleSchema,
            },
        ]),
    ],
    providers: [PuzzleResolver, PuzzleService, PuzzleRepository],
    exports: [PuzzleService, PuzzleRepository],
})
export class PuzzleModule {}
