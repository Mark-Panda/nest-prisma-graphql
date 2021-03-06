import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { configYml } from 'commons/public-tool';

@ApiTags('静态页面')
@Controller()
export class PageController {
    @Get()
    async indexHtml(@Res() res) {
        return res.redirect('dev');
    }

    @Get('login')
    async loginHtml(@Res() res) {
        return res.render('login');
    }

    @Get('dev')
    async devHtml(@Res() res) {
        return res.render('dev', { swaggerPath: configYml.swagger.path });
    }

    @Get('upload')
    async uploadHtml(@Res() res) {
        return res.render('upload');
    }

    @Get('graph')
    async graph(@Res() res) {
        if (process.env.NODE_ENV === 'production') {
            return res.json({ message: '生产环境不允许使用graph!' });
        }
        return res.render('view', { path: configYml.graphql.path });
    }

    @Get('playground')
    async playgroundHtml(@Res() res) {
        if (process.env.NODE_ENV === 'production') {
            return res.json({ message: '生产环境不允许使用playground!' });
        }
        return res.render('playground', {
            path: configYml.graphql.path,
        });
    }
}
