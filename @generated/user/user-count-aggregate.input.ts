import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserCountAggregateInput {
    @Field(() => Boolean, { nullable: true })
    id?: true;

    @Field(() => Boolean, { nullable: true })
    create_date?: true;

    @Field(() => Boolean, { nullable: true })
    update_date?: true;

    @Field(() => Boolean, { nullable: true })
    email?: true;

    @Field(() => Boolean, { nullable: true })
    username?: true;

    @Field(() => Boolean, { nullable: true })
    password?: true;

    @Field(() => Boolean, { nullable: true })
    reg_ip?: true;

    @Field(() => Boolean, { nullable: true })
    login_ip?: true;

    @Field(() => Boolean, { nullable: true })
    login_date?: true;

    @Field(() => Boolean, { nullable: true })
    phone?: true;

    @Field(() => Boolean, { nullable: true })
    nickname?: true;

    @Field(() => Boolean, { nullable: true })
    avatar?: true;

    @Field(() => Boolean, { nullable: true })
    role?: true;

    @Field(() => Boolean, { nullable: true })
    _all?: true;
}
