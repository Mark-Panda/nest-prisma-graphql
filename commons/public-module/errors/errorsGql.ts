import {
    ApolloError,
    SyntaxError,
    ValidationError,
    AuthenticationError,
    ForbiddenError,
    UserInputError,
} from 'apollo-server-express';

/**
 * 异常检查
 * 提供更准确友好的异常消息
 * @param {GraphQLError} graphQLError GraphQLError
 */
export const formatError = (graphQLError) => {
    try {
        const { extensions, message, name } = graphQLError;
        return { extensions, message, name };
    } catch (error) {
        return graphQLError;
    }
};

export class SystemError extends ApolloError {
    /**
     * @param {string} message 提示信息
     * @param {object} exceptions 额外的扩展信息
     * @param {string} code 错误编码
     */
    constructor(message, exceptions, code) {
        super(message);
        //名字问题
        if (!this.name) {
            Object.defineProperty(this, 'name', { value: code });
        }
        //添加code
        this.extensions = { code };
        //额外的扩展信息
        if (exceptions) {
            Object.keys(exceptions).forEach((key) => {
                this[key] = exceptions[key];
            });
        }
    }
}

/**
 * 请求行数限制
 */
export class RequestDataRowsLimit extends SystemError {
    constructor(message, exceptions) {
        const code = 'RequestDataRowsLimit';
        super(message, exceptions, code);
    }
}

/**
 * 请求数据大小限制
 */
export class RequestDataSizeLimit extends SystemError {
    constructor(message, exceptions) {
        const code = 'RequestDataSizeLimit';
        super(message, exceptions, code);
    }
}

/**
 * 字符串过筛警告
 */
export class CharacterFilterWarn extends SystemError {
    constructor(message, exceptions) {
        const code = 'CharacterFilterWarn';
        super(message, exceptions, code);
    }
}

/**
 * 关联关系异常
 */
export class DataIntegrityError extends SystemError {
    constructor(message, exceptions) {
        const code = 'DataIntegrityError';
        super(message, exceptions, code);
    }
}

/**
 * 数据查询错误
 */
export class DataQueryError extends SystemError {
    constructor(message, exceptions) {
        const code = 'DataQueryError';
        super(message, exceptions, code);
    }
}

export {
    ApolloError,
    SyntaxError,
    ValidationError,
    AuthenticationError,
    ForbiddenError,
    UserInputError,
};
