import { Module } from '@nestjs/common';
import { SimpleModule } from './simple/simple.module';
@Module({
    imports: [SimpleModule],
})
export class CustomGraphqlModules {}
