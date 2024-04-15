import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteResponse {
    @Field(() => Boolean)
    status: boolean;
    @Field(() => String, { nullable: true })
    message?: string;
}