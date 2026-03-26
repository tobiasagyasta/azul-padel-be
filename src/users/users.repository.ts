import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new user record.
  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  // Return all user records.
  findAll() {
    return this.prisma.user.findMany();
  }

  // Find one user by its primary key.
  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Update one user by its primary key.
  update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete one user by its primary key.
  delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
