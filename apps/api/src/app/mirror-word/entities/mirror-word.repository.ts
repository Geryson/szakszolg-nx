import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { MirrorWord, MirrorWordDocument } from './mirror-word.entity'
import { Model } from 'mongoose'
import { UpdateMirrorWordInput } from '../dto/inputs/update-mirror-word.input'
import { CreateMirrorWordInput } from '../dto/inputs/create-mirror-word.input'
import { GetMirrorWordsArgs } from '../dto/args/get-mirror-words.args'
import { GetMirrorWordArgs } from '../dto/args/get-mirror-word.args'
import { IMirrorWord } from '@szakszolg-nx/api-interfaces'
import { DeleteMirrorWordInput } from '../dto/inputs/delete-mirror-word.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class MirrorWordRepository extends SimpleRepository<
    MirrorWordDocument,
    IMirrorWord,
    GetMirrorWordArgs,
    GetMirrorWordsArgs,
    CreateMirrorWordInput,
    UpdateMirrorWordInput,
    DeleteMirrorWordInput
> {
    constructor(@InjectModel(MirrorWord.name) mirrorWordModel: Model<MirrorWordDocument>) {
        super(mirrorWordModel)
    }

    override async findOne(__data: GetMirrorWordArgs): Promise<IMirrorWord> {
        const count = await this.model.estimatedDocumentCount()
        const random = Math.floor(Math.random() * count)
        return this.model.findOne().skip(random).limit(1)
    }
}
