import { Module } from '@nestjs/common'
import { GroupingItem2Service } from './grouping-item2.service'
import { GroupingItem2Resolver } from './grouping-item2.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupingItem2, GroupingItemSchema } from './entities/grouping-item2.entity'
import { GroupingItem2Repository } from './entities/grouping-item2.repository'
import { GroupingItem2Controller } from './grouping-item2.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: GroupingItem2.name,
                schema: GroupingItemSchema,
            },
        ]),
    ],
    controllers: [GroupingItem2Controller],
    providers: [GroupingItem2Resolver, GroupingItem2Service, GroupingItem2Repository],
    exports: [GroupingItem2Service, GroupingItem2Repository],
})
export class GroupingItem2Module {}
