import { Test, TestingModule } from '@nestjs/testing'
import { QuizAnswerOptionResolver } from './quiz-answer-option.resolver'
import { QuizAnswerOptionService } from './quiz-answer-option.service'

describe('QuizAnswerOptionResolver', () => {
    let resolver: QuizAnswerOptionResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuizAnswerOptionResolver, QuizAnswerOptionService],
        }).compile()

        resolver = module.get<QuizAnswerOptionResolver>(QuizAnswerOptionResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
