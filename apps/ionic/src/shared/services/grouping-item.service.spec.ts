import { TestBed } from '@angular/core/testing'

import { GroupingItemService } from './grouping-item.service'

describe('GroupingItemServiceService', () => {
    let service: GroupingItemService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(GroupingItemService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
