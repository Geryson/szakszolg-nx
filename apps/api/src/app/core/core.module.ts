import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { GraphQLModule } from '@nestjs/graphql'
import { CoreResolver } from './core.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { mongooseConfigFactory } from '../../utils/factories/mongo-config.factory'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: true,
        }),
        MongooseModule.forRootAsync({
            imports: mongooseConfigFactory.imports,
            useFactory: mongooseConfigFactory.mongooseConfigFactory,
            inject: mongooseConfigFactory.providers,
        }),
    ],
    controllers: [],
    providers: [CoreResolver],
    exports: [],
})
export class CoreModule {}
