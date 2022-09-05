import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Field(() => String)
    _id: string;
}