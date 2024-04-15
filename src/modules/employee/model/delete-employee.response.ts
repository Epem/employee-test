import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteResponse {
    @Field(/* istanbul ignore next */() => Boolean)
    status: boolean;
    @Field(/* istanbul ignore next */() => String, { nullable: true })
    message?: string;
}