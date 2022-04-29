import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TcpContext } from '@nestjs/microservices';
import { LoggerService } from 'commons/public-module';
import { toIp } from './data';

export interface Response<T> {
    code: number;
    data: T;
}

let num = 0;
const line = '-'.repeat(50);
const interval = '/'.repeat(50);

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        const loggerService = new LoggerService();
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        loggerService.log(interval, `第 ${++num} 次请求`);
        loggerService.log(line, '请求接收');

        let resNext = next.handle();

        if (res instanceof TcpContext) {
            loggerService.log(res.getPattern(), 'TCP 请求');
            if (Object.keys(req).length) {
                if (Array.isArray(req)) {
                    for (const index in req) {
                        loggerService.log(req[index], `请求参数[${index}]`);
                    }
                } else {
                    loggerService.log(req, '请求参数');
                }
            }
            // 避免返回空导致参数序列化错误
            resNext = resNext.pipe(map((data) => data || {}));
        } else {
            const { url, clientIp, method, body } = req;
            loggerService.log(url, `${toIp(clientIp)} ${method}`);
            Object.keys(body).length && loggerService.log(body, '请求参数');
            // 响应参数转化为统一格式
            resNext = resNext.pipe(
                map((data) => ({ code: res.statusCode, data })),
            );
        }
        return resNext.pipe(
            tap((res) => {
                loggerService.log(res, '响应结果');
                loggerService.log(line, '请求成功');
            }),
        );
    }
}
