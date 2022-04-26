import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import {
    ApiTags,
    ApiBody,
    ApiBearerAuth,
    ApiResponse,
    ApiHeaders,
} from '@nestjs/swagger';
import { JwtAuthGuard, LocalAuthGuard } from 'commons/public-module';
import { ApiOperation } from 'commons/public-decorator';
import { AuthService } from './auth.service';
import {
    LoginInfoResponse,
    UserInfoResponse,
    LoginDto,
    RegisternInfoDto,
    CommonResponse,
} from './auth.entity';

@ApiTags('登录鉴权')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 201, type: LoginInfoResponse })
    @ApiOperation('登录')
    async login(@Req() req) {
        return this.authService.login(req);
    }

    @Get('profile')
    @ApiBearerAuth('Authorization')
    @ApiHeaders([
        {
            name: 'RefreshToken',
            description: 'Custom header',
        },
    ])
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, type: UserInfoResponse })
    @ApiOperation('获取帐号信息')
    getInfo(@Req() req) {
        return this.authService.getInfo(req.user.id);
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, type: CommonResponse })
    @ApiOperation('退出登录')
    async logout(@Req() req) {
        return this.authService.logout(req);
    }

    @Post('register')
    @ApiResponse({ status: 200, type: CommonResponse })
    @ApiBody({ type: RegisternInfoDto })
    @ApiOperation('注册')
    async register(@Req() req): Promise<object> {
        return this.authService.register(req);
    }
}
