import { Controller, Get, Res } from '@nestjs/common';

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
        
        return res.render('dev');
    }

    @Get('playground')
    async playgroundHtml(@Res() res) {
        if (process.env.NODE_ENV === 'production') {
            return res.json({ message: '生产环境不允许使用playground!'})
        }
        return res.render('playground');
    }
}
