import { Test, TestingModule } from '@nestjs/testing'
import { PuzzleService } from './puzzle.service'

describe('PuzzleService', () => {
    let service: PuzzleService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PuzzleService],
        }).compile()

        service = module.get<PuzzleService>(PuzzleService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
