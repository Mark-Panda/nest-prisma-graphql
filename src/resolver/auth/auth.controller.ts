import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AccountLoginDto } from './auth.entity';
import { ApiOperation } from 'commons/public-decorator';
import { AuthService } from './auth.service';
import { AdminLoginInfoDto } from './auth.entity';
import { JwtAuthGuard } from '../../jwtAuth/jwt-auth.guard';
import { LocalAuthGuard } from '../../jwtAuth/local-auth.guard';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: AccountLoginDto })
    @ApiResponse({ status: 201, type: AdminLoginInfoDto })
    @ApiOperation('登录')
    async login(@Req() req) {
        return this.authService.login(req);
    }

    @Get('profile')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, type: AdminLoginInfoDto })
    @ApiOperation('获取帐号信息')
    getInfo(@Req() req) {
        return this.authService.getInfo(req.user.id);
    }

    @Post('register')
    // @ApiResponse({ status: 200, type: AdminLoginInfoDto })
    // @ApiBody({ type: AccountLoginDto })
    @ApiOperation('注册')
    async register(@Req() req): Promise<object> {
        return this.authService.register(req);
    }
}
