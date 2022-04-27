import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
@Module({
    imports: [PageModule, AuthModule],
})
export class AllResolverModules {}
