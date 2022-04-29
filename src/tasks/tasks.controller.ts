import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'commons/public-module';
import { TasksService } from './tasks.service';
import {
    ApiTags,
    ApiBody,
    ApiResponse,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { ApiOperation } from 'commons/public-decorator';
import { CommonResponse } from 'src/datos/common.dto';
import { TasksBaseDto, TasksExecDto } from 'src/datos/tasks.dto';
import { Roles } from 'commons/public-module/roles/role.decorator';
import { Role } from 'commons/public-module/roles/role.enum';

@ApiTags('定时任务')
@Controller('cron')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get('getAllTask')
    @ApiOperation('获取所有定时任务')
    @ApiResponse({ status: 201, type: CommonResponse })
    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    async getAllTask(): Promise<object> {
        return this.taskService.getCrons();
    }

    @Post('addCronJob')
    @ApiOperation('动态设置定时任务名称和时间')
    @ApiBody({ type: TasksExecDto })
    @ApiResponse({ status: 201, type: CommonResponse })
    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    async addCronJob(@Req() req): Promise<object> {
        const { name, seconds } = req.body;
        return this.taskService.addCronJob(name, seconds);
    }

    @Post('reSetCron')
    @ApiOperation('重置指定名称的定时任务执行时间')
    @ApiBody({ type: TasksExecDto })
    @ApiResponse({ status: 201, type: CommonResponse })
    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    async reSetCron(@Req() req): Promise<object> {
        const { name, seconds } = req.body;
        return this.taskService.reSetCron(name, seconds);
    }

    @Post('stopCron')
    @Roles(Role.Admin)
    @ApiOperation('暂停指定名称的定时任务')
    @ApiBody({ type: TasksBaseDto })
    @ApiQuery({ name: 'roles', enum: Role })
    @ApiResponse({ status: 201, type: CommonResponse })
    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    async stopCron(@Req() req): Promise<object> {
        const { name } = req.body;
        return this.taskService.stopCron(name);
    }

    @Post('deleteCron')
    @ApiOperation('删除指定名称的定时任务')
    @ApiBody({ type: TasksBaseDto })
    @ApiResponse({ status: 201, type: CommonResponse })
    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    async deleteCron(@Req() req): Promise<object> {
        const { name } = req.body;
        return this.taskService.deleteCron(name);
    }
}
