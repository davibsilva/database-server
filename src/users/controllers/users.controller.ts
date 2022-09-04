import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { FindUserDto } from "../dto/find-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserDto)
    }

    @Get()
    async finAll(): Promise<FindUserDto[]> {
        return await this.usersService.findAll()
    }

    @Get('/:id')
    async findById(@Param('id') id: string): Promise<FindUserDto> {
        return await this.usersService.findById(id)
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<FindUserDto> {
        return await this.usersService.update(id, updateUserDto)
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.usersService.delete(id)
    }
}