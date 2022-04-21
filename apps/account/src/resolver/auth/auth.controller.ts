import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// import { AccountLoginDto } from './auth.entity';
import { ApiOperation } from '@app/public-decorator';
import { AuthService } from './auth.service';
// import { AdminLoginInfoDto, AdminInfoDto } from './auth.entity';
import { JwtAuthGuard } from '../../jwtAuth/jwt-auth.guard';
import { LocalAuthGuard } from '../../jwtAuth/local-auth.guard';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    // @ApiBody({ type: AccountLoginDto })
    // @ApiResponse({ status: 200, type: AdminLoginInfoDto })
    @ApiOperation('登录')
    async login(@Req() req) {
        console.log('11111');
        return this.authService.login(req);
    }

    @Get('profile')
    // @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    // @ApiResponse({ status: 200, type: AdminInfoDto })
    @ApiOperation('获取帐号信息')
    getInfo(@Req() req) {
        return this.authService.getInfo(req.user.id);
    }
}