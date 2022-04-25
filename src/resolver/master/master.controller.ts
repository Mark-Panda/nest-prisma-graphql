import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class MasterController {
    @Get()
    async indexHtml(@Res() res) {
        return res.redirect('dev');
    }

    @Get('login')
    async loginHtml(@Res() res) {
        return res.render('login');
    }

    @Get('/dev')
    async devHtml(@Res() res) {
        return res.render('dev');
    }

    @Get('playground')
    async playgroundHtml(@Res() res) {
        return res.render('playground');
    }
}
