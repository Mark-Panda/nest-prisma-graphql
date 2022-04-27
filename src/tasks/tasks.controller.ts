import {
    Controller,
    UseGuards,
    Post,
    Get,
    Req,
    Inject,
    CACHE_MANAGER,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggerService, LocalAuthGuard } from 'commons/public-module';
import { TasksService } from './tasks.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from 'commons/public-decorator';

@ApiTags('定时任务')
@Controller('cron')
export class TasksController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
        private readonly taskService: TasksService,
        @Inject(CACHE_MANAGER) private readonly cacheManager,
    ) {}

    @Post('reSetCron')
    @ApiOperation('重置指定名称的定时任务执行时间')
    @UseGuards(LocalAuthGuard)
    async reSetCron(@Req() req) {
        const { name, time } = req.body;
        return this.taskService.reSetCron(name, time);
    }

    @Get('getAllTask')
    @ApiOperation('获取所有定时任务')
    async getAllTask(): Promise<object[]> {
        return this.taskService.getCrons();
    }

    @Post('addCronJob')
    @ApiOperation('动态设置定时任务名称和时间')
    async addCronJob(@Req() req): Promise<object> {
        const { name, time } = req.body;
        return this.taskService.addCronJob(name, time);
    }
}
