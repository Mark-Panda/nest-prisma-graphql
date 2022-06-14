import { upperDirectiveTransformer } from './upper-case.directive';
import { lowerDirectiveTransformer } from './lower-case.directive';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { conditionFilterMiddleware } from 'commons/public-module/middlewareGql/conditionFilterMiddleware';

export function mergeDirectiveTransformer(schema: GraphQLSchema) {
    //GraphQL中间件
    const middlewares = [conditionFilterMiddleware];
    //合并中间件
    schema = applyMiddleware(schema, ...middlewares);
    // GraphQL指令
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const upperDirective = getDirective(
                schema,
                fieldConfig,
                'upper',
            )?.[0];
            const lowerDirective = getDirective(
                schema,
                fieldConfig,
                'lower',
            )?.[0];
            if (lowerDirective) {
                return lowerDirectiveTransformer(fieldConfig);
            }
            if (upperDirective) {
                return upperDirectiveTransformer(fieldConfig);
            }
        },
    });
}
