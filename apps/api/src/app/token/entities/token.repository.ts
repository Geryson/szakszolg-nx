import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Token, TokenDocument } from './token.entity'
import { Model, Types } from 'mongoose'
import { UpdateTokenInput } from '../dto/inputs/update-token.input'
import { CreateTokenInput } from '../dto/inputs/create-token.input'
import { GetTokensArgs } from '../dto/args/get-tokens.args'
import { GetTokenArgs } from '../dto/args/get-token.args'
import { IToken } from '@szakszolg-nx/api-interfaces'
import { DeleteTokenInput } from '../dto/inputs/delete-token.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class TokenRepository extends SimpleRepository<
    TokenDocument,
    IToken,
    GetTokenArgs,
    GetTokensArgs,
    CreateTokenInput,
    UpdateTokenInput,
    DeleteTokenInput
> {
    constructor(@InjectModel(Token.name) resourceModel: Model<TokenDocument>) {
        super(resourceModel)
    }

    private static generateToken() {
        return Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    public override async findOne(data: GetTokenArgs): Promise<IToken> {
        const res = (await this.model.findOne({ token: data.token }).populate('quiz').exec()) as any
        Logger.debug(`TokenRepository.findOne: ${JSON.stringify(res)}`)
        return res?.deletedAt
            ? Promise.reject(new NotFoundException(`Model with token ${data.token} not found or has been deleted`))
            : res
    }

    public override async create(data: CreateTokenInput): Promise<IToken> {
        const { expiresIn, quizId } = data
        const model = await new this.model({
            _id: new Types.ObjectId(),
            token: TokenRepository.generateToken(),
            quiz: quizId,
            expiresAt: new Date(Date.now() + (expiresIn ?? 3600) * 1000),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            deletedAt: null,
        }).save()
        return model.populate('quiz')
    }
}
