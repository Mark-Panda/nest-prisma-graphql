import { ApiProperty } from 'commons/public-decorator';

export class TasksBaseDto {
    @ApiProperty('定时作业名称')
    name!: string;
}

export class TasksExecDto extends TasksBaseDto {
    @ApiProperty('定时任务执行规则')
    seconds!: string;
}
