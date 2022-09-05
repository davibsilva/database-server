import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
    @Field(() => String, { description: 'username of the user' })
    username: string;
    @Field(() => String, { description: 'password of the user' })
    password: string;
    @Field(() => String, { description: 'name name of the user' })
    name: string;
}