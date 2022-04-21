import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    create_date = "create_date",
    update_date = "update_date",
    email = "email",
    username = "username",
    password = "password",
    reg_ip = "reg_ip",
    login_ip = "login_ip",
    login_date = "login_date",
    phone = "phone",
    nickname = "nickname",
    avatar = "avatar",
    role = "role"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
