import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export default class TasksService {
    constructor(private schedulerRegistry: SchedulerRegistry) {}
    private readonly logger = new Logger(TasksService.name);

    /**
     * 创建一个新的cron作业
     * @param name cron作业名称
     * @param seconds cron作业时间
     */
    addCronJob(name: string, seconds: string) {
        const job = new CronJob(`${seconds} * * * * *`, () => {
            this.logger.warn(
                `定时任务: time (${seconds}) for job ${name} to run!`,
            );
        });

        this.schedulerRegistry.addCronJob(name, job);
        job.start();

        this.logger.warn(
            `job ${name} added for each minute at ${seconds} seconds!`,
        );
    }
    /**
     * 列出所有 cron 作业
     */
    getCrons() {
        const jobs = this.schedulerRegistry.getCronJobs();
        jobs.forEach((value, key, map) => {
            let next;
            try {
                next = value.nextDates().toDate();
            } catch (e) {
                next = 'error: next fire date is in the past!';
            }
            this.logger.log(`job: ${key} -> next: ${next}`);
        });
    }
    /**
     * 删除cron作业
     * @param name 作业名称
     */
    deleteCron(name: string) {
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`);
    }

    /**
     * 暂停cron作业
     * @param name cron作业名称
     */
    stopCron(name: string) {
        const job = this.schedulerRegistry.getCronJob(name);
        job.stop();
        this.logger.log(`job最后执行时间: ${job.lastDate()}`);
    }
}
