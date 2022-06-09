import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = 'id',
    create_date = 'create_date',
    update_date = 'update_date',
    isDelete = 'isDelete',
    username = 'username',
    email = 'email',
    password = 'password',
    role = 'role',
    RFID = 'RFID',
    description = 'description',
    expired = 'expired',
    status = 'status',
}

registerEnumType(UserScalarFieldEnum, {
    name: 'UserScalarFieldEnum',
    description: undefined,
});
