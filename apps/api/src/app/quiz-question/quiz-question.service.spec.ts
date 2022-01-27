import { Test, TestingModule } from '@nestjs/testing'
import { QuizQuestionService } from './quiz-question.service'

describe('QuizQuestionService', () => {
    let service: QuizQuestionService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuizQuestionService],
        }).compile()

        service = module.get<QuizQuestionService>(QuizQuestionService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
