import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MasterModule } from './master/master.module';
@Module({
    imports: [AuthModule, MasterModule],
})
export class AllResolverModules {}
