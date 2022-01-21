import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { GraphQLModule } from '@nestjs/graphql'
import { CoreResolver } from './core.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { mongooseConfig } from './config/mongo-config.factory'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            playground: true,
        }),
        MongooseModule.forRootAsync({
            imports: mongooseConfig.imports,
            useFactory: mongooseConfig.mongooseConfigFactory,
            inject: mongooseConfig.providers,
        }),
    ],
    controllers: [],
    providers: [CoreResolver],
    exports: [],
})
export class CoreModule {}
