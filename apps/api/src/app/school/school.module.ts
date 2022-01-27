import { Module } from '@nestjs/common'
import { SchoolService } from './school.service'
import { SchoolResolver } from './school.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { School, SchoolSchema } from './entities/school.entity'
import { SchoolRepository } from './entities/school.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: School.name,
                schema: SchoolSchema,
            },
        ]),
    ],
    providers: [SchoolResolver, SchoolService, SchoolRepository],
    exports: [SchoolService, SchoolRepository],
})
export class SchoolModule {}
