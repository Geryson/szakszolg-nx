import { Test, TestingModule } from '@nestjs/testing'
import { MirrorWordService } from './mirror-word.service'

describe('MirrorWordService', () => {
    let service: MirrorWordService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MirrorWordService],
        }).compile()

        service = module.get<MirrorWordService>(MirrorWordService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
