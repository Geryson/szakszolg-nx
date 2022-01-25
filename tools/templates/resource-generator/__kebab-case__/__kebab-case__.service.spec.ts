import { Test, TestingModule } from '@nestjs/testing'
import { __PascalCase__Service } from './__kebab-case__.service'

describe('__PascalCase__Service', () => {
    let service: __PascalCase__Service

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [__PascalCase__Service],
        }).compile()

        service = module.get<__PascalCase__Service>(__PascalCase__Service)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
