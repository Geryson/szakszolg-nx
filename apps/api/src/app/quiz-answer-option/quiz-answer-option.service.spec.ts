import { Test, TestingModule } from '@nestjs/testing'
import { QuizAnswerOptionService } from './quiz-answer-option.service'

describe('QuizAnswerOptionService', () => {
    let service: QuizAnswerOptionService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuizAnswerOptionService],
        }).compile()

        service = module.get<QuizAnswerOptionService>(QuizAnswerOptionService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
