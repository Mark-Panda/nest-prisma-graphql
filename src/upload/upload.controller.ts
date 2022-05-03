import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'commons/public-module';
import { ApiOperation } from 'commons/public-decorator';
import { UploadService } from './upload.service';

@ApiTags('文件上传')
@Controller('chunk')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Get('checkChunk')
    @UseGuards(JwtAuthGuard)
    @ApiOperation('检查chunk文件, 断点续传验证片段')
    checkChunk(@Req() req, @Res() res) {
        return this.uploadService.checkChunk(req, res);
    }

    @Get('checkFile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation('检查文件')
    checkFile(@Req() req, @Res() res) {
        return this.uploadService.checkFile(req, res);
    }

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @ApiOperation('上传文件')
    uploadChunk(@Req() req, @Res() res) {
        return this.uploadService.uploadChunk(req, res);
    }

    @Get('merge')
    @UseGuards(JwtAuthGuard)
    @ApiOperation('合并文件')
    merageChuank(@Req() req, @Res() res) {
        return this.uploadService.merageChuank(req, res);
    }
}
