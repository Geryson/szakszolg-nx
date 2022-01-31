import { Test, TestingModule } from '@nestjs/testing'
import { QuizAnswerResolver } from './quiz-answer.resolver'
import { QuizAnswerService } from './quiz-answer.service'

describe('QuizAnswerResolver', () => {
    let resolver: QuizAnswerResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuizAnswerResolver, QuizAnswerService],
        }).compile()

        resolver = module.get<QuizAnswerResolver>(QuizAnswerResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
