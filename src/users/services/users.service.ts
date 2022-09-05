import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        this.userModel.updateOne
        return createdUser.save()
    }
    
    async findAll(): Promise<FindUserDto[]> {
        return (await this.userModel.find().exec()).map((user) => {
            return new FindUserDto(
                user.id,
                user.username,
                user.name,
            )
        })
    }

    async findById(id: String): Promise<FindUserDto> {
        const user = await this.userModel.findById(id)

        return new FindUserDto(
            user.id,
            user.username,
            user.name,
        )
    }

    async update(id: String, updateUserDto: UpdateUserDto): Promise<FindUserDto> {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto)

        return new FindUserDto(
            user.id,
            user.username,
            user.name,
        )
    }

    async delete(id: String) {
        return await this.userModel.deleteOne({id: id})
    }
}