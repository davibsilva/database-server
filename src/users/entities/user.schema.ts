import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
    @Field(() => String)
    _id: string

    @Prop()
    @Field(() => String, { description: 'User username ' })
    username: string;

    @Prop()
    @Field(() => String, { description: 'User password ' })
    password: string;

    @Prop()
    @Field(() => String, { description: 'User name ' })
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User)