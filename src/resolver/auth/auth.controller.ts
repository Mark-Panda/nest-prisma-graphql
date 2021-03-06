import {
    Controller,
    UseGuards,
    Post,
    Get,
    Req,
    UseInterceptors,
    UseFilters,
} from '@nestjs/common';
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
} from './auth.entity';
import { CommonResponse } from 'src/datos/common.dto';
import { AllExceptionFilter, TransformInterceptor } from 'commons/public-tool';

@ApiTags('登录鉴权')
@Controller('auth')
@UseInterceptors(TransformInterceptor)
@UseFilters(AllExceptionFilter)
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
        const userInfo = this.authService.getInfo(req.user.id);
        req.user = userInfo;
        return userInfo;
    }

    @Get('logout')
    @ApiResponse({ status: 200, type: CommonResponse })
    @ApiOperation('退出登录')
    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
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
