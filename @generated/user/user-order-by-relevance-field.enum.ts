import { registerEnumType } from '@nestjs/graphql';

export enum UserOrderByRelevanceFieldEnum {
    id = "id",
    email = "email",
    username = "username",
    password = "password",
    reg_ip = "reg_ip",
    login_ip = "login_ip",
    phone = "phone",
    nickname = "nickname",
    avatar = "avatar"
}


registerEnumType(UserOrderByRelevanceFieldEnum, { name: 'UserOrderByRelevanceFieldEnum', description: undefined })
