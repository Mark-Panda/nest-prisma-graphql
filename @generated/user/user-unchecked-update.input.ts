import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { EnumRoleFieldUpdateOperationsInput } from '../prisma/enum-role-field-update-operations.input';
import { UserGroupUncheckedUpdateManyWithoutUsersNestedInput } from '../user-group/user-group-unchecked-update-many-without-users-nested.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { PersonUncheckedUpdateManyWithoutUserNestedInput } from '../person/person-unchecked-update-many-without-user-nested.input';
import { NullableFloatFieldUpdateOperationsInput } from '../prisma/nullable-float-field-update-operations.input';
import { EnumUserStatusFieldUpdateOperationsInput } from '../prisma/enum-user-status-field-update-operations.input';

@InputType()
export class UserUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    id?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
    create_date?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
    update_date?: DateTimeFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
    isDelete?: BoolFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    username?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    email?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    password?: StringFieldUpdateOperationsInput;

    @Field(() => EnumRoleFieldUpdateOperationsInput, { nullable: true })
    role?: EnumRoleFieldUpdateOperationsInput;

    @Field(() => UserGroupUncheckedUpdateManyWithoutUsersNestedInput, {
        nullable: true,
    })
    group?: UserGroupUncheckedUpdateManyWithoutUsersNestedInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
    RFID?: NullableStringFieldUpdateOperationsInput;

    @Field(() => PersonUncheckedUpdateManyWithoutUserNestedInput, {
        nullable: true,
    })
    person?: PersonUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableFloatFieldUpdateOperationsInput, { nullable: true })
    expired?: NullableFloatFieldUpdateOperationsInput;

    @Field(() => EnumUserStatusFieldUpdateOperationsInput, { nullable: true })
    status?: EnumUserStatusFieldUpdateOperationsInput;
}
