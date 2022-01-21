import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const mongooseConfig = {
    imports: [ConfigModule],
    providers: [ConfigService],
    mongooseConfigFactory: async (configService: ConfigService): Promise<MongooseModuleOptions | any> => {
        const uri = `mongodb+srv://${configService.get<string>('DATABASE_USER')}@${configService.get<string>(
            'DATABASE_HOST',
        )}/${configService.get<string>(
            'DATABASE_NAME',
        )}?authMechanism=MONGODB-X509&ssl=true&retryWrites=true&w=majority`
        const cert = configService.get<string>('DATABASE_CERT')
        return {
            uri,
            sslKey: cert,
            sslCert: cert,
        }
    },
}
