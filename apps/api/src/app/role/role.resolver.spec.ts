import { Test, TestingModule } from '@nestjs/testing'
import { RoleResolver } from './role.resolver'
import { RoleService } from './role.service'

describe('RoleResolver', () => {
    let resolver: RoleResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleResolver, RoleService],
        }).compile()

        resolver = module.get<RoleResolver>(RoleResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
