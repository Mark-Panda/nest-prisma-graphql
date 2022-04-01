import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { DummyModule } from './dummy/dummy.module';
import { UserModule } from './user/user.module';
import { LoggingPlugin } from './common/plugins/logging.plugin';
import { ComplexityPlugin } from './common/plugins/complexity.plugin';

@Module({
  providers: [LoggingPlugin, ComplexityPlugin],
  imports: [
    UserModule,
    DummyModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      playground: true,
      autoSchemaFile: '~schema.gql',
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
})
export class AppModule {}
