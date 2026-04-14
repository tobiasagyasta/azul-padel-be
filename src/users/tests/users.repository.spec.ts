import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { UsersRepository } from '../users.repository';
import { createUserMock } from './fixtures/user.fixture';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let prisma: {
    user: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('creates a user through Prisma', async () => {
    const user = createUserMock();
    const data = {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    prisma.user.create.mockResolvedValue(user);

    await expect(repository.create(data)).resolves.toEqual(user);
    expect(prisma.user.create).toHaveBeenCalledWith({ data });
  });

  it('returns all users ordered by id ascending', async () => {
    const user = createUserMock();

    prisma.user.findMany.mockResolvedValue([user]);

    await expect(repository.findAll()).resolves.toEqual([user]);
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      orderBy: { id: 'asc' },
    });
  });

  it('finds a user by id', async () => {
    const user = createUserMock();

    prisma.user.findUnique.mockResolvedValue(user);

    await expect(repository.findById(1)).resolves.toEqual(user);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('finds a user by username', async () => {
    const user = createUserMock();

    prisma.user.findUnique.mockResolvedValue(user);

    await expect(repository.findByUsername('azul-user')).resolves.toEqual(user);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: 'azul-user' },
    });
  });

  it('updates a user through Prisma', async () => {
    const user = createUserMock();
    const data = { name: 'Updated Azul' };
    const updatedUser = { ...user, name: 'Updated Azul' };

    prisma.user.update.mockResolvedValue(updatedUser);

    await expect(repository.update(1, data)).resolves.toEqual(updatedUser);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('deletes a user through Prisma', async () => {
    const user = createUserMock();

    prisma.user.delete.mockResolvedValue(user);

    await expect(repository.delete(1)).resolves.toEqual(user);
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
