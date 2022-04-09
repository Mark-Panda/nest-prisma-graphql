import { upperDirectiveTransformer } from './upper-case.directive';
import { lowerDirectiveTransformer } from './lower-case.directive';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

export function mergeDirectiveTransformer(schema: GraphQLSchema) {
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
                console.log('lowerDirective');
                return lowerDirectiveTransformer(fieldConfig);
            }
            if (upperDirective) {
                console.log('upperDirective');
                return upperDirectiveTransformer(fieldConfig);
            }
        },
    });
}
