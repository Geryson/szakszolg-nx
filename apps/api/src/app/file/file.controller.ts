import { Controller, Get, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter, readDirAsync } from '../../utils/file.utils'
import { UPLOAD_PATH } from '../../utils/constants'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('file')
export class FileController {
    @Post('')
    @UseGuards(JwtAuthGuard)
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

    @Get('')
    async getFiles() {
        return readDirAsync(UPLOAD_PATH)
    }

    @Get(':path')
    seeUploadedFile(@Param('path') image, @Res() res) {
        return res.sendFile(image, { root: UPLOAD_PATH })
    }
}
