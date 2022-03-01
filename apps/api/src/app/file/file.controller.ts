import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, fileNameGenerator, imageFileFilter, readDirAsync } from '../../utils/file.utils'
import { UPLOAD_PATH } from '../../utils/constants'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { unlink, writeFile } from 'fs/promises'

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

    @Post('base64')
    @UseGuards(JwtAuthGuard)
    async uploadBase64(@Body('name') name: string, @Body('image') image: string) {
        const buffer = image.split(';base64,').pop()
        const fileName = fileNameGenerator(name)
        await writeFile(`${UPLOAD_PATH}/${fileName}`, buffer, { encoding: 'base64' })
        return {
            originalName: name,
            filename: fileName,
        }
    }

    @Get('')
    async getFiles() {
        return readDirAsync(UPLOAD_PATH)
    }

    @Get(':path')
    seeUploadedFile(@Param('path') image, @Res() res) {
        return res.sendFile(image, { root: UPLOAD_PATH })
    }

    @Delete(':path')
    @UseGuards(JwtAuthGuard)
    async deleteFile(@Param('path') image) {
        try {
            Logger.log(`Deleting file ${image}`)
            await unlink(`${UPLOAD_PATH}/${image}`)
            return ''
        } catch (error) {
            console.log(error)
        }
    }
}
