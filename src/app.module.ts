import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GlobalModule } from 'commons/public-module';
import { configYml } from 'commons/public-tool';
import { AllModules } from 'services/index';
import { mergeDirectiveTransformer } from './graphqlDirective/index.directive';
import { AllResolverModules } from './resolver/index';
import { CustomGraphqlModules } from './graphqlResolver/index';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { UploadModule } from './upload/upload.module';
import { EventsModule } from './wsResolver/events/events.module';
@Module({
    imports: [
        GlobalModule.forRoot({
            cache: true,
        }),
        AllModules,
        AllResolverModules,
        CustomGraphqlModules,
        ScheduleModule.forRoot(),
        TasksModule,
        UploadModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            cors: true,
            path: configYml.serve.graphqlPath,
            driver: ApolloDriver,
            // 多个指令如何实现
            transformSchema: (schema) => mergeDirectiveTransformer(schema),
            installSubscriptionHandlers: true,
            playground: false, // playground的使用由playground路由控制 src/resolver/page/page.controller.ts详情查看
            autoSchemaFile: '~schema.gql',
            buildSchemaOptions: {
                directives: [
                    new GraphQLDirective({
                        name: 'upper',
                        locations: [DirectiveLocation.FIELD_DEFINITION],
                    }),
                    new GraphQLDirective({
                        name: 'lower',
                        locations: [DirectiveLocation.FIELD_DEFINITION],
                    }),
                ],
            },
        }),
        EventsModule,
    ],
})
export class AppModule {}
