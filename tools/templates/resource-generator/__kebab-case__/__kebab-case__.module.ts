import { Module } from '@nestjs/common'
import { __PascalCase__Service } from './__kebab-case__.service'
import { __PascalCase__Resolver } from './__kebab-case__.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { __PascalCase__, __PascalCase__Schema } from './entities/__kebab-case__.entity'
import { __PascalCase__Repository } from './entities/__kebab-case__.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: __PascalCase__.name,
                schema: __PascalCase__Schema,
            },
        ]),
    ],
    providers: [__PascalCase__Resolver, __PascalCase__Service, __PascalCase__Repository],
    exports: [__PascalCase__Service, __PascalCase__Repository],
})
export class __PascalCase__Module {}
