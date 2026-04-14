import { Role } from '@prisma/client';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';

export function createUserMock(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: 'Azul User',
    username: 'azul-user',
    email: 'azul-user@example.com',
    password: 'hashed-password',
    role: Role.USER,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

export function createUserDtoMock(
  overrides: Partial<CreateUserDto> = {},
): CreateUserDto {
  return {
    name: 'Azul User',
    username: 'azul-user',
    email: 'azul-user@example.com',
    password: 'plain-secret',
    role: Role.USER,
    ...overrides,
  };
}

export function updateUserDtoMock(
  overrides: Partial<UpdateUserDto> = {},
): UpdateUserDto {
  return {
    name: 'Updated Name',
    ...overrides,
  };
}
