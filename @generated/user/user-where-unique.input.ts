import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Scalars from 'graphql-scalars';
import * as Validator from 'class-validator';
import { UserEmailUsernameCompoundUniqueInput } from './user-email-username-compound-unique.input';

@InputType()
export class UserWhereUniqueInput {
    @Field(() => String, { nullable: true })
    id?: string;

    @Field(() => Scalars.GraphQLEmailAddress, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    @Validator.MinLength(3)
    @Validator.MaxLength(50)
    username?: string;

    @Field(() => UserEmailUsernameCompoundUniqueInput, { nullable: true })
    email_username?: UserEmailUsernameCompoundUniqueInput;
}
