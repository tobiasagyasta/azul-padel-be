import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = { ...createUserDto };
    return this.usersRepository.create(data);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const data: Prisma.UserUpdateInput = { ...updateUserDto };
    return this.usersRepository.update(id, data);
  }

  remove(id: number): Promise<User> {
    return this.usersRepository.delete(id);
  }
}
