import { Module } from '@nestjs/common';
import { LoggerService } from '@app/public-module';
import { ProfileResolver } from './profile.resolver';

@Module({
    imports: [],
    providers: [ProfileResolver, LoggerService],
})
export class ProfileModule {}
