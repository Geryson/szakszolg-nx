import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { TokenResolver } from './token.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Token, TokenSchema } from './entities/token.entity'
import { TokenRepository } from './entities/token.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Token.name,
                schema: TokenSchema,
            },
        ]),
    ],
    providers: [TokenResolver, TokenService, TokenRepository],
    exports: [TokenService, TokenRepository],
})
export class TokenModule {}
