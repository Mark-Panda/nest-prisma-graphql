import { isListType } from 'graphql';
import { RequestDataRowsLimit } from 'commons/public-module/errors/errorsGql';
import { queryCharacterCheck } from 'commons/public-decorator/index';
import { configYml } from 'commons/public-tool/config';
/**
 * 条件过滤
 */
export const conditionFilterMiddleware = async (
    resolve,
    root,
    args,
    context,
    info,
) => {
    const operationName = info.operation.operation;
    switch (operationName) {
        case 'query':
            const { variableValues } = info;
            const variableList = [variableValues, args];
            for (let index = 0; index < variableList.length; index++) {
                const variable = variableList[index];
                if (variable.hasOwnProperty('where')) {
                    //数据查询
                    queryCharacterCheck(variable.where);
                }
            }
            const maxRows = configYml.graphql.queryMaxRows;
            const ofType = info.returnType.ofType || info.returnType;
            if (maxRows && maxRows > 0 && isListType(ofType)) {
                let firstExist = false;
                for (let index = 0; index < variableList.length; index++) {
                    const variable = variableList[index];
                    if (variable.hasOwnProperty('take')) {
                        firstExist = true;
                        if (variable.take > maxRows) {
                            throw new RequestDataRowsLimit(
                                `一次性查询数据条数不能超过 ${maxRows} 条`,
                                {
                                    variable,
                                },
                            );
                        }
                    }
                }
                if (!firstExist) {
                    //开发环境异常提示
                    if (process.env.NODE_ENV === 'development') {
                        throw new RequestDataRowsLimit(
                            `一次性查询数据需要设置最大条数限制,不能超过 ${maxRows} 条`,
                            {
                                variable: { ...variableValues, ...args },
                            },
                        );
                    }
                }
            }
            break;
    }
    return await resolve();
    // return await resolve(root, args, context, info);
};
