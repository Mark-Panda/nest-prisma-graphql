import { Controller, Get } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    async getHello(): Promise<string> {
        return this.loginService.getHello();
    }
}
