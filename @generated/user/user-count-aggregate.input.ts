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
    isDelete?: true;

    @Field(() => Boolean, { nullable: true })
    username?: true;

    @Field(() => Boolean, { nullable: true })
    email?: true;

    @Field(() => Boolean, { nullable: true })
    password?: true;

    @Field(() => Boolean, { nullable: true })
    role?: true;

    @Field(() => Boolean, { nullable: true })
    RFID?: true;

    @Field(() => Boolean, { nullable: true })
    description?: true;

    @Field(() => Boolean, { nullable: true })
    expired?: true;

    @Field(() => Boolean, { nullable: true })
    status?: true;

    @Field(() => Boolean, { nullable: true })
    _all?: true;
}
