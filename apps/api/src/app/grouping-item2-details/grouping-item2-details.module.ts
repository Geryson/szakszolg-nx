import { Module } from '@nestjs/common'
import { GroupingItem2DetailsService } from './grouping-item2-details.service'
import { GroupingItem2DetailsResolver } from './grouping-item2-details.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupingItem2Details, GroupingItem2DetailsSchema } from './entities/grouping-item2-details.entity'
import { GroupingItem2DetailsRepository } from './entities/grouping-item2-details.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: GroupingItem2Details.name,
                schema: GroupingItem2DetailsSchema,
            },
        ]),
    ],
    providers: [GroupingItem2DetailsResolver, GroupingItem2DetailsService, GroupingItem2DetailsRepository],
    exports: [GroupingItem2DetailsService, GroupingItem2DetailsRepository],
})
export class GroupingItem2DetailsModule {}
