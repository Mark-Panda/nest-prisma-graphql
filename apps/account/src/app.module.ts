import { Module } from '@nestjs/common';
import { GlobalModule } from '@app/public-module';
import { AllModules } from '../../../services/index';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { mergeDirectiveTransformer } from './graphqlDirective/index.directive';
import { AllResolverModules } from './resolver/index';
@Module({
    imports: [
        GlobalModule.forRoot({
            yamlFilePath: ['apps/account.yaml'],
        }),
        AllModules,
        AllResolverModules,
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
