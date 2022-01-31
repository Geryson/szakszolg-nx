import { Test, TestingModule } from '@nestjs/testing'
import { QuizAnswerService } from './quiz-answer.service'

describe('QuizAnswerService', () => {
    let service: QuizAnswerService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuizAnswerService],
        }).compile()

        service = module.get<QuizAnswerService>(QuizAnswerService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
