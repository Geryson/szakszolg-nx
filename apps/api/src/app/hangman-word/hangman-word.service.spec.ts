import { Test, TestingModule } from '@nestjs/testing'
import { HangmanWordService } from './hangman-word.service'

describe('HangmanWordService', () => {
    let service: HangmanWordService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HangmanWordService],
        }).compile()

        service = module.get<HangmanWordService>(HangmanWordService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
