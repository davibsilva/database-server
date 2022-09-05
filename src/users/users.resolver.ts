import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListUsersInput } from './dto/list-users.input';
import { ListUsersResponse } from './dto/list-users.response';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, { getPagingParameters } from '../common/relay/connection.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => ListUsersResponse, { name: 'listUsersWithCursor' })
  async findAllWithCursor(@Args('args') args: ConnectionArgs): Promise<ListUsersResponse> {
  const { limit, offset } = getPagingParameters(args);
  const { users, count } = await this.usersService.getUsers({
    limit,
    offset,
  });
  const page = connectionFromArraySlice(users, args, {
    arrayLength: count,
    sliceStart: offset || 0,
  });

  return { page, pageData: { count, limit, offset } };
}

  @Query(() => [User], { name: 'users' })
  findAll(@Args('listUsersInput') listUsersInput: ListUsersInput) {
    return this.usersService.findAll(listUsersInput);
  }

  @Query(() => User, { name: 'user' })
  findById(@Args('_id', { type: () => String }) id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('_id', { type: () => String }) id: string) {
    return this.usersService.removeUser(id);
  }
}