import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TagUpdateManyWithoutArticlesInput } from '../tag/tag-update-many-without-articles.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { UserUpdateOneRequiredWithoutArticlesInput } from '../user/user-update-one-required-without-articles.input';
import { UserUpdateManyWithoutFavoriteArticlesInput } from '../user/user-update-many-without-favorite-articles.input';
import { CommentUpdateManyWithoutArticleInput } from '../comment/comment-update-many-without-article.input';
import { NullableBoolFieldUpdateOperationsInput } from '../prisma/nullable-bool-field-update-operations.input';

@InputType()
export class ArticleUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    slug?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    title?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    description?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
    body?: StringFieldUpdateOperationsInput;

    @Field(() => TagUpdateManyWithoutArticlesInput, { nullable: true })
    tags?: TagUpdateManyWithoutArticlesInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
    favoritesCount?: IntFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutArticlesInput, { nullable: true })
    author?: UserUpdateOneRequiredWithoutArticlesInput;

    @Field(() => UserUpdateManyWithoutFavoriteArticlesInput, { nullable: true })
    favoritedBy?: UserUpdateManyWithoutFavoriteArticlesInput;

    @Field(() => CommentUpdateManyWithoutArticleInput, { nullable: true })
    comments?: CommentUpdateManyWithoutArticleInput;

    @Field(() => NullableBoolFieldUpdateOperationsInput, { nullable: true })
    active?: NullableBoolFieldUpdateOperationsInput;
}
