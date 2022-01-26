import { Test, TestingModule } from '@nestjs/testing'
import { MirrorWordResolver } from './mirror-word.resolver'
import { MirrorWordService } from './mirror-word.service'

describe('MirrorWordResolver', () => {
    let resolver: MirrorWordResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MirrorWordResolver, MirrorWordService],
        }).compile()

        resolver = module.get<MirrorWordResolver>(MirrorWordResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
