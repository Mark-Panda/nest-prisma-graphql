import { Injectable } from '@nestjs/common';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob, time } from 'cron';
import moment from 'moment';
import { LoggerService } from 'commons/public-module';

@Injectable()
export class TasksService {
    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private readonly logger: LoggerService,
    ) {}

    /**
     * 创建一个新的cron作业
     * @param name cron作业名称
     * @param seconds cron作业时间
     */
    addCronJob(name: string, seconds: string) {
        try {
            const job = new CronJob(seconds, () => {
                this.logger.log(
                    `自定义的定时任务: time (${seconds}) for job ${name} to run!`,
                    '定时任务',
                );
            });

            this.schedulerRegistry.addCronJob(name, job);
            job.start();

            this.logger.log(
                `job ${name} added for each minute at ${seconds} seconds!`,
                '定时任务',
            );
            return {
                data: { name, seconds },
                message: `创建定时作业${name}成功`,
            };
        } catch (error) {
            return { error: `创建定时作业${name}失败`, message: error.message };
        }
    }
    /**
     * 列出所有 cron 作业
     */
    async getCrons(): Promise<object> {
        try {
            const jobs = this.schedulerRegistry.getCronJobs();
            this.logger.log(jobs, '所有定时任务');
            const jobList = [];
            jobs.forEach((value, key) => {
                let next;
                try {
                    next = moment(value.nextDates().toDate()).format(
                        'YYYY-MM-DD HH:mm:ss',
                    );
                } catch (e) {
                    next = 'error: next fire date is in the past!';
                }
                this.logger.log(
                    `当前定时任务: ${key} -> 下次执行时间: ${next}`,
                    '定时任务',
                );
                jobList.push({
                    name: key,
                    nextExecTime: next,
                });
            });
            return { data: jobList, message: '查询所有定时作业' };
        } catch (error) {
            return { error: '查询定时作业失败', message: error.message };
        }
    }

    /**
     * 删除cron作业
     * @param name 作业名称
     */
    async deleteCron(name: string): Promise<object> {
        try {
            this.schedulerRegistry.deleteCronJob(name);
            this.logger.warn(`job ${name} deleted!`, '定时任务');
            return { data: 'SUCCESS', message: `定时作业${name}删除成功` };
        } catch (error) {
            return { error: `定时作业${name}删除失败`, message: error.message };
        }
    }

    /**
     * 暂停cron作业
     * @param name cron作业名称
     */
    async stopCron(name: string): Promise<object> {
        try {
            const job = this.schedulerRegistry.getCronJob(name);
            job.stop();
            this.logger.log(`job最后执行时间: ${job.lastDate()}`, '定时任务');
            return { data: 'SUCCESS', message: `定时作业${name}已暂停` };
        } catch (error) {
            return { error: `定时作业${name}暂停失败`, message: error.message };
        }
    }

    /**
     * 重置cron作业
     * @param name cron作业名称
     */
    async reSetCron(name: string, seconds: string): Promise<object> {
        try {
            const job = this.schedulerRegistry.getCronJob(name);
            // * * * * * *
            // | | | | | |
            // | | | | | day of week
            // | | | | months
            // | | | day of month
            // | | hours
            // | minutes
            // seconds (optional)
            job.setTime(time(seconds));
            this.logger.log(`job最后执行时间: ${job.lastDate()}`, '定时任务');
            return { data: 'SUCCESS', message: `定时作业${name}重置成功` };
        } catch (error) {
            return { error: `定时作业${name}重置失败`, message: error.message };
        }
    }

    @Cron('* * 8 * * *', {
        name: 'customCronName',
    })
    async customCronName() {
        this.logger.log('自定义定时任务逻辑', '定时任务');
    }
}
