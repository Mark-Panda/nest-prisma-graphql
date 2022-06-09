import { registerEnumType } from '@nestjs/graphql';

export enum Role {
    ADMIN = 'ADMIN',
    SYSTEM = 'SYSTEM',
    USER = 'USER',
}

registerEnumType(Role, { name: 'Role', description: '角色定义' });
