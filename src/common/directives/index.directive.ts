import { mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { upperDirectiveTransformer } from './upper-case.directive';
import { lowerDirectiveTransformer } from './lower-case.directive';

export function mergeDirectiveTransformer(schema: GraphQLSchema) {
    const upplis = upperDirectiveTransformer(schema, 'upper');
    const lowlis = lowerDirectiveTransformer(schema, 'lower');
    const newSchema = Object.assign(schema, { upplis, lowlis });
    return mapSchema(newSchema);
}
