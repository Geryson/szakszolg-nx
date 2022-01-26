import { Test, TestingModule } from '@nestjs/testing'
import { HangmanWordResolver } from './hangman-word.resolver'
import { HangmanWordService } from './hangman-word.service'

describe('HangmanWordResolver', () => {
    let resolver: HangmanWordResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HangmanWordResolver, HangmanWordService],
        }).compile()

        resolver = module.get<HangmanWordResolver>(HangmanWordResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
