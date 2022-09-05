import { InputType, Field, ArgsType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field(() => String, { description: 'username of the user' })
    username: string;
    @Field(() => String, { description: 'password of the user' })
    password: string;
    @Field(() => String, { description: 'name name of the user' })
    name: string;
}