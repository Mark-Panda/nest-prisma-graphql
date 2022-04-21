import { Controller, Post, Req } from '@nestjs/common';
// import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('register')
    // @ApiResponse({ status: 200, type: AdminLoginInfoDto })
    // @ApiBody({ type: AccountLoginDto })
    @ApiOperation('注册')
    async register(@Req() req): Promise<string> {
        return this.loginService.register(req.body);
    }
}
