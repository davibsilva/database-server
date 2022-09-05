import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListUsersInput } from './dto/list-users.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(createUserInput: CreateUserInput) {
        const createdUser = new this.userModel(createUserInput);
        return createdUser.save()
    }
    
    async getUsers(paginationQuery: ListUsersInput) {
        const count = await this.userModel.count();
        const users = await this.findAll(paginationQuery);
        return { users, count };
    }

    async findAll(paginationQuery: ListUsersInput) {
        const { limit, offset } = paginationQuery;
        return this.userModel.find().skip(offset).limit(limit).exec();
    }

    async findById(id: String) {
        const user = await this.userModel.findOne({ _id: id }).exec();
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return user;
    }

    async updateUser(id: String, updateUserInput: UpdateUserInput) {
        const existingUser = await this.userModel
            .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
            .exec();

        if (!existingUser) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return existingUser;
    }

    async removeUser(id: String) {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return user.remove();
    }
}