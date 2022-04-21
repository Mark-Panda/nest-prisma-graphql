import { Controller, Get } from '@nestjs/common';
// import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    // @ApiResponse({ status: 200, type: AdminLoginInfoDto })
    // @ApiBody({ type: AccountLoginDto })
    @ApiOperation('Hello')
    async getHello(): Promise<string> {
        return this.loginService.getHello();
    }
}
