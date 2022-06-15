import { CharacterFilterWarn } from 'commons/public-module/errors/errorsGql';
import { isObject } from 'util';
/**
 * 查询字符串检查
 * @param {Object} values 查询条件
 */
export const queryCharacterCheck = (values) => {
    if (isObject(values)) {
        for (const key in values) {
            const value = values[key];
            return queryCharacterCheck(value);
        }
    } else if (Array.isArray(values)) {
        for (let index = 0; index < values.length; index++) {
            const value = values[index];
            return queryCharacterCheck(value);
        }
    }
    // 查询输入条件不能包含非法字符;
    if (isString(values) && /[`~!#$%^&*(){}\[\]|\\'"<>?,]|^_$/.test(values)) {
        throw new CharacterFilterWarn(
            '查询输入条件不能包含非法字符[\\`~!#$%^&*(){}[]|\'"<>?,]',
            {
                values,
            },
        );
    }

    return true;
};

/**
 * 是否字符串
 * @param {Object} obj 任意对象
 */
export const isString = (obj) => {
    return Object.prototype.toString.call(obj) === '[object String]';
};

/**
 * 构造prisma查询字段select格式
 * @param list
 * @param selectObj select构造对象
 * @returns
 */
export function selectInfo(selectList: any, selectObj: any) {
    for (const item of selectList) {
        if (item.selectionSet) {
            const signInfo = selectInfo(item.selectionSet.selections, {});
            selectObj[`${item.name.value}`] = { select: signInfo };
        } else {
            selectObj[`${item.name.value}`] = true;
        }
    }
    return selectObj;
}
