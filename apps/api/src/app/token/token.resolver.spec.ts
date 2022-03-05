import { Test, TestingModule } from '@nestjs/testing'
import { TokenResolver } from './token.resolver'
import { TokenService } from './token.service'

describe('TokenResolver', () => {
    let resolver: TokenResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TokenResolver, TokenService],
        }).compile()

        resolver = module.get<TokenResolver>(TokenResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
