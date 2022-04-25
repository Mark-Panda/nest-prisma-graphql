import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
@Module({
    imports: [AuthModule, PageModule],
})
export class AllResolverModules {}
