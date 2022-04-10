import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { mergeDirectiveTransformer } from './common/directives/index.directive';
import { AllModules } from '../services/index';
import { LoggingPlugin } from './common/plugins/logging.plugin';
import { ComplexityPlugin } from './common/plugins/complexity.plugin';

@Module({
    providers: [LoggingPlugin, ComplexityPlugin],
    imports: [
        AllModules,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            // 多个指令如何实现
            transformSchema: (schema) => mergeDirectiveTransformer(schema),
            installSubscriptionHandlers: true,
            playground: true,
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
