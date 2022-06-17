import { Module } from '@nestjs/common';
import { SimpleModule } from './simple/simple.module';
import { MultiTaskModule } from './multiTask/multiTask.module';
@Module({
    imports: [SimpleModule, MultiTaskModule],
})
export class CustomGraphqlModules {}
