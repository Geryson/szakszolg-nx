import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const mongooseConfigFactory = {
    imports: [ConfigModule],
    providers: [ConfigService],
    mongooseConfigFactory: async (configService: ConfigService): Promise<MongooseModuleOptions | any> => {
        const cert = configService.get<string>('DATABASE_CERT')
        let uri: string
        if (cert) {
            uri = `mongodb+srv://${configService.get<string>('DATABASE_USER')}@${configService.get<string>(
                'DATABASE_HOST',
            )}/${configService.get<string>(
                'DATABASE_NAME',
            )}?authMechanism=MONGODB-X509&ssl=true&retryWrites=true&w=majority`
            return {
                uri,
                sslKey: cert,
                sslCert: cert,
            }
        } else {
            uri = `mongodb+srv://${configService.get<string>('DATABASE_USER')}:${configService.get<string>(
                'DATABASE_PASSWORD',
            )}@${configService.get<string>('DATABASE_HOST')}/${configService.get<string>(
                'DATABASE_NAME',
            )}?retryWrites=true&w=majority`
            return {
                uri,
            }
        }
    },
}
