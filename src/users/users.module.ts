import { DatabaseService } from './../database/database.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersSqlController } from './users-sql.controller';
import { UsersSqlRepository } from './users-sql.repository';
import { UsersSqlService } from './users-sql.service';

@Module({
  imports: [],
  controllers: [UsersController, UsersSqlController],
  providers: [
    PrismaService,
    UsersRepository,
    UsersService,
    UsersSqlRepository,
    UsersSqlService,
    DatabaseService,
  ],
})
export class UsersModule {}
