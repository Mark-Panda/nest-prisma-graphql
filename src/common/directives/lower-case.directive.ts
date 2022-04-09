import { defaultFieldResolver } from 'graphql';

export function lowerDirectiveTransformer(fieldConfig: any) {
    const { resolve = defaultFieldResolver } = fieldConfig;
    // Replace the original resolver with a function that *first* calls
    // the original resolver, then converts its result to upper case
    fieldConfig.resolve = async function (source, args, context, info) {
        const result = await resolve(source, args, context, info);
        if (typeof result === 'string') {
            return result.toLowerCase();
        }
        return result;
    };
    return fieldConfig;
}
