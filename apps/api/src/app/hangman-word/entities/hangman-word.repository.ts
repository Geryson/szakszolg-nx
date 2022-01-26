import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { HangmanWord, HangmanWordDocument } from './hangman-word.entity'
import { Model } from 'mongoose'
import { UpdateHangmanWordInput } from '../dto/inputs/update-hangman-word.input'
import { CreateHangmanWordInput } from '../dto/inputs/create-hangman-word.input'
import { GetHangmanWordsArgs } from '../dto/args/get-hangman-words.args'
import { GetHangmanWordArgs } from '../dto/args/get-hangman-word.args'
import { IHangmanWord } from '@szakszolg-nx/api-interfaces'
import { DeleteHangmanWordInput } from '../dto/inputs/delete-hangman-word.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class HangmanWordRepository extends SimpleRepository<
    HangmanWordDocument,
    IHangmanWord,
    GetHangmanWordArgs,
    GetHangmanWordsArgs,
    CreateHangmanWordInput,
    UpdateHangmanWordInput,
    DeleteHangmanWordInput
> {
    constructor(@InjectModel(HangmanWord.name) hangmanWordModel: Model<HangmanWordDocument>) {
        super(hangmanWordModel)
    }

    override async findAll(data: GetHangmanWordsArgs | null): Promise<IHangmanWord[]> {
        if (!data?.category && !data?.ids) return super.findAll(data)
        let res: any[]
        const param = {}
        if (data.category) param['category'] = { $regex: data.category, $options: 'i' }
        res = await this.model.find(param)
        if (data.ids?.length > 0) res = res.filter((x) => data.ids.includes(x._id.toString()))
        return res
    }

    override async findOne(data: GetHangmanWordArgs): Promise<IHangmanWord> {
        if (data?.category) {
            // Note: If we want more than a few hundred words per category, we should use findOne().skip()
            const res = await this.model.find({ category: { $regex: data.category, $options: 'i' } })
            return res[Math.floor(Math.random() * res.length)]
        }

        const count = await this.model.estimatedDocumentCount()
        const random = Math.floor(Math.random() * count)
        return this.model.findOne().skip(random).limit(1)
    }
}
