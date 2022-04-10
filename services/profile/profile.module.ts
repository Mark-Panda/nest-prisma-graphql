import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';

@Module({
    imports: [],
    providers: [ProfileResolver],
})
export class ProfileModule {}
