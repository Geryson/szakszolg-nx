import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { MulterModule } from '@nestjs/platform-express'
import { multerConfigFactory } from '../../utils/factories/multer-config.factory'

@Module({
    imports: [MulterModule.registerAsync({ useFactory: multerConfigFactory })],
    providers: [FileService],
    exports: [FileService],
    controllers: [FileController],
})
export class FileModule {}
