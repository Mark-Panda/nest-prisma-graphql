import { registerEnumType } from '@nestjs/graphql';

export enum Role {
    USER = 'USER',
    SYSTEM = 'SYSTEM',
    ADMIN = 'ADMIN',
}

registerEnumType(Role, { name: 'Role', description: undefined });
