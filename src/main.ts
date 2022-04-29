import { AppModule } from './app.module';
import { bootstrap } from '../commons/public-tool';
// 启动服务
bootstrap(AppModule, { cors: true });
