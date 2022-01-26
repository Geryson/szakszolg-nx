import { Test, TestingModule } from '@nestjs/testing'
import { GroupingItemResolver } from './grouping-item.resolver'
import { GroupingItemService } from './grouping-item.service'

describe('GroupingItemResolver', () => {
    let resolver: GroupingItemResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GroupingItemResolver, GroupingItemService],
        }).compile()

        resolver = module.get<GroupingItemResolver>(GroupingItemResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
