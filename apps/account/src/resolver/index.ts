import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [LoginModule, AuthModule],
})
export class AllResolverModules {}
