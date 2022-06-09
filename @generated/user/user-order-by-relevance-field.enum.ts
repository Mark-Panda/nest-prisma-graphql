import { registerEnumType } from '@nestjs/graphql';

export enum UserOrderByRelevanceFieldEnum {
    id = 'id',
    username = 'username',
    email = 'email',
    password = 'password',
    RFID = 'RFID',
    description = 'description',
}

registerEnumType(UserOrderByRelevanceFieldEnum, {
    name: 'UserOrderByRelevanceFieldEnum',
    description: undefined,
});
