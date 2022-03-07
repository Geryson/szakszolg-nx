import { Test, TestingModule } from '@nestjs/testing'
import { PuzzleResolver } from './puzzle.resolver'
import { PuzzleService } from './puzzle.service'

describe('PuzzleResolver', () => {
    let resolver: PuzzleResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PuzzleResolver, PuzzleService],
        }).compile()

        resolver = module.get<PuzzleResolver>(PuzzleResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
