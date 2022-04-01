import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TagWhereInput } from './tag-where.input';

@ArgsType()
export class DeleteManyTagArgs {

    @Field(() => TagWhereInput, {nullable:true})
    where?: TagWhereInput;
}
