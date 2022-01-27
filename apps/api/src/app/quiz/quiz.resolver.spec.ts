import { Test, TestingModule } from '@nestjs/testing'
import { QuizResolver } from './quiz.resolver'
import { QuizService } from './quiz.service'

describe('QuizResolver', () => {
    let resolver: QuizResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuizResolver, QuizService],
        }).compile()

        resolver = module.get<QuizResolver>(QuizResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
