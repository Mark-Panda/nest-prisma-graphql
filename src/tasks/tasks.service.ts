import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { LoggerService } from 'commons/public-module';
import { CronJob, time } from 'cron';
import * as moment from 'moment';

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
        const job = new CronJob(seconds, () => {
            this.logger.warn(
                `自定义的定时任务: time (${seconds}) for job ${name} to run!`,
                '定时任务',
            );
        });

        this.schedulerRegistry.addCronJob(name, job);
        job.start();

        this.logger.warn(
            `job ${name} added for each minute at ${seconds} seconds!`,
            '定时任务',
        );
        return { name, seconds };
    }
    /**
     * 列出所有 cron 作业
     */
    async getCrons(): Promise<object[]> {
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
        return jobList;
    }

    /**
     * 删除cron作业
     * @param name 作业名称
     */
    deleteCron(name: string) {
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`, '定时任务');
    }

    /**
     * 暂停cron作业
     * @param name cron作业名称
     */
    stopCron(name: string) {
        const job = this.schedulerRegistry.getCronJob(name);
        job.stop();
        this.logger.log(`job最后执行时间: ${job.lastDate()}`, '定时任务');
    }

    /**
     * 重置cron作业
     * @param name cron作业名称
     */
    reSetCron(name: string, seconds: string) {
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
    }
}
