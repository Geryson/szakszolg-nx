import { Test, TestingModule } from '@nestjs/testing'
import { __PascalCase__Resolver } from './__kebab-case__.resolver'
import { __PascalCase__Service } from './__kebab-case__.service'

describe('__PascalCase__Resolver', () => {
    let resolver: __PascalCase__Resolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [__PascalCase__Resolver, __PascalCase__Service],
        }).compile()

        resolver = module.get<__PascalCase__Resolver>(__PascalCase__Resolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
