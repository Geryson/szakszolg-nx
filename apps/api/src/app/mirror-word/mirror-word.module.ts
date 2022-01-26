import { Module } from '@nestjs/common'
import { MirrorWordService } from './mirror-word.service'
import { MirrorWordResolver } from './mirror-word.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { MirrorWord, MirrorWordSchema } from './entities/mirror-word.entity'
import { MirrorWordRepository } from './entities/mirror-word.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: MirrorWord.name,
                schema: MirrorWordSchema,
            },
        ]),
    ],
    providers: [MirrorWordResolver, MirrorWordService, MirrorWordRepository],
    exports: [MirrorWordService, MirrorWordRepository],
})
export class MirrorWordModule {}
