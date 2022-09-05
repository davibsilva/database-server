import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { User, UserSchema } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";

@Module({
    imports: [
        MongooseModule.forFeature([
            { 
                name: User.name,
                schema: UserSchema 
            }
        ])
    ],
    providers: [UsersResolver, UsersService],
})
export class UsersModule {}