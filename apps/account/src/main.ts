import { AppModule } from './app.module';
import { bootstrap } from '@app/public-tool';
// import { LoggerService } from '@app/public-module';
// 启动服务
bootstrap(AppModule, { microservice: false });
// bootstrap(AppModule, { microservice: false, logger: new LoggerService() });
