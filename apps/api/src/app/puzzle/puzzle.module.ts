import { Module } from '@nestjs/common'
import { PuzzleService } from './puzzle.service'
import { PuzzleResolver } from './puzzle.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Puzzle, PuzzleSchema } from './entities/puzzle.entity'
import { PuzzleRepository } from './entities/puzzle.repository'
import { MulterModule } from '@nestjs/platform-express'
import { multerConfigFactory } from '../../utils/factories/multer-config.factory'
import { PuzzleController } from './puzzle.controller'

@Module({
    imports: [
        MulterModule.registerAsync({ useFactory: multerConfigFactory }),
        MongooseModule.forFeature([
            {
                name: Puzzle.name,
                schema: PuzzleSchema,
            },
        ]),
    ],
    providers: [PuzzleResolver, PuzzleService, PuzzleRepository],
    exports: [PuzzleService, PuzzleRepository],
    controllers: [PuzzleController],
})
export class PuzzleModule {}
