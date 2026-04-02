import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

type UserRow = Pick<
  User,
  'id' | 'name' | 'email' | 'password' | 'role' | 'createdAt'
>;

@Injectable()
export class UsersSqlRepository {
  private readonly selectColumns = `
    "id",
    "name",
    "email",
    "password",
    "role",
    "createdAt"
  `;

  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateUserDto): Promise<User> {
    const result = await this.databaseService.query<UserRow>(
      `
        INSERT INTO "User" ("name", "email", "password", "role")
        VALUES ($1, $2, $3, $4::"Role")
        RETURNING ${this.selectColumns}
      `,
      [data.name, data.email, data.password, data.role ?? Role.USER],
    );

    return result.rows[0];
  }

  async findAll(): Promise<User[]> {
    const result = await this.databaseService.query<UserRow>(`
      SELECT ${this.selectColumns}
      FROM "User"
      ORDER BY "id" ASC
    `);

    return result.rows;
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.databaseService.query<UserRow>(
      `
        SELECT ${this.selectColumns}
        FROM "User"
        WHERE "id" = $1
      `,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async update(id: number, data: UpdateUserDto): Promise<User | null> {
    const assignments: string[] = [];
    const values: Array<number | string | Role> = [];

    if (data.name !== undefined) {
      values.push(data.name);
      assignments.push(`"name" = $${values.length}`);
    }

    if (data.email !== undefined) {
      values.push(data.email);
      assignments.push(`"email" = $${values.length}`);
    }

    if (data.password !== undefined) {
      values.push(data.password);
      assignments.push(`"password" = $${values.length}`);
    }

    if (data.role !== undefined) {
      values.push(data.role);
      assignments.push(`"role" = $${values.length}::"Role"`);
    }

    if (assignments.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const result = await this.databaseService.query<UserRow>(
      `
        UPDATE "User"
        SET ${assignments.join(', ')}
        WHERE "id" = $${values.length}
        RETURNING ${this.selectColumns}
      `,
      values,
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<User | null> {
    const result = await this.databaseService.query<UserRow>(
      `
        DELETE FROM "User"
        WHERE "id" = $1
        RETURNING ${this.selectColumns}
      `,
      [id],
    );

    return result.rows[0] ?? null;
  }
}
