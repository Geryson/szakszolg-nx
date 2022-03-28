import { Module } from '@nestjs/common'
import { GroupingItemService } from './grouping-item.service'
import { GroupingItemResolver } from './grouping-item.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupingItem, GroupingItemSchema } from './entities/grouping-item.entity'
import { GroupingItemRepository } from './entities/grouping-item.repository'
import { GroupingItemController } from './grouping-item.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: GroupingItem.name,
                schema: GroupingItemSchema,
            },
        ]),
    ],
    controllers: [GroupingItemController],
    providers: [GroupingItemResolver, GroupingItemService, GroupingItemRepository],
    exports: [GroupingItemService, GroupingItemRepository],
})
export class GroupingItemModule {}
