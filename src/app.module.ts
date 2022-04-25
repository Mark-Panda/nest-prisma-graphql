import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GlobalModule } from 'commons/public-module';
import { AllModules } from 'services/index';
import { mergeDirectiveTransformer } from './graphqlDirective/index.directive';
import { AllResolverModules } from './resolver/index';
import { CustomGraphqlModules } from './graphqlResolver/index';
@Module({
    imports: [
        GlobalModule.forRoot({
            cache: true,
        }),
        AllModules,
        AllResolverModules,
        CustomGraphqlModules,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            path: '/data/graphql',
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
    ],
})
export class AppModule {}
