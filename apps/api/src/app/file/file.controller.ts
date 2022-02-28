import { Controller, Get, Logger, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from '../../utils/file.utils'
import { UPLOAD_PATH } from '../../utils/constants'

@Controller('file')
export class FileController {
    @Post('')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: UPLOAD_PATH,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        Logger.debug('HIT')
        const response = []
        files.forEach((file) => {
            const fileResponse = {
                originalName: file.originalname,
                filename: file.filename,
            }
            response.push(fileResponse)
        })
        return response
    }

    @Get(':path')
    seeUploadedFile(@Param('path') image, @Res() res) {
        return res.sendFile(image, { root: UPLOAD_PATH })
    }
}
