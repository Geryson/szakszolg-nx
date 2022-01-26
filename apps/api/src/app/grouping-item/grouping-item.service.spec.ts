import { Test, TestingModule } from '@nestjs/testing'
import { GroupingItemService } from './grouping-item.service'

describe('GroupingItemService', () => {
    let service: GroupingItemService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GroupingItemService],
        }).compile()

        service = module.get<GroupingItemService>(GroupingItemService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
