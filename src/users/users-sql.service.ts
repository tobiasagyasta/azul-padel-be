import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersSqlRepository } from './users-sql.repository';

@Injectable()
export class UsersSqlService {
  constructor(private readonly usersSqlRepository: UsersSqlRepository) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersSqlRepository.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersSqlRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersSqlRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersSqlRepository.update(id, updateUserDto);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersSqlRepository.delete(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
