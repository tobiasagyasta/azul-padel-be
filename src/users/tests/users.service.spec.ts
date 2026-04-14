import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '../../password/password.service';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import {
  createUserDtoMock,
  createUserMock,
  updateUserDtoMock,
} from './fixtures/user.fixture';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: {
    create: jest.Mock;
    findAll: jest.Mock;
    findById: jest.Mock;
    findByUsername: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  let passwordService: {
    hashPassword: jest.Mock;
  };

  beforeEach(async () => {
    usersRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByUsername: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    passwordService = {
      hashPassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: usersRepository,
        },
        {
          provide: PasswordService,
          useValue: passwordService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hashes the password before creating a user', async () => {
    const createUserDto = createUserDtoMock();
    const user = createUserMock();

    passwordService.hashPassword.mockResolvedValue('hashed-password');
    usersRepository.create.mockResolvedValue(user);

    await expect(service.create(createUserDto)).resolves.toEqual(user);

    expect(passwordService.hashPassword).toHaveBeenCalledWith('plain-secret');
    expect(usersRepository.create).toHaveBeenCalledWith({
      ...createUserDto,
      password: 'hashed-password',
    });
  });

  it('returns all users from the repository', async () => {
    const user = createUserMock();

    usersRepository.findAll.mockResolvedValue([user]);

    await expect(service.findAll()).resolves.toEqual([user]);
    expect(usersRepository.findAll).toHaveBeenCalled();
  });

  it('returns a user when findOne matches an existing record', async () => {
    const user = createUserMock();

    usersRepository.findById.mockResolvedValue(user);

    await expect(service.findOne(1)).resolves.toEqual(user);
    expect(usersRepository.findById).toHaveBeenCalledWith(1);
  });

  it('throws NotFoundException when findOne cannot find a user', async () => {
    usersRepository.findById.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(
      new NotFoundException('User with ID 99 not found'),
    );
    expect(usersRepository.findById).toHaveBeenCalledWith(99);
  });

  it('delegates findByUsername to the repository', async () => {
    const user = createUserMock();

    usersRepository.findByUsername.mockResolvedValue(user);

    await expect(service.findByUsername('azul-user')).resolves.toEqual(user);
    expect(usersRepository.findByUsername).toHaveBeenCalledWith('azul-user');
  });

  it('updates a user without hashing when password is absent', async () => {
    const updateUserDto = updateUserDtoMock({
      email: 'updated@example.com',
    });
    const updatedUser = createUserMock({
      name: 'Updated Name',
      email: 'updated@example.com',
    });

    usersRepository.update.mockResolvedValue(updatedUser);

    await expect(service.update(1, updateUserDto)).resolves.toEqual(
      updatedUser,
    );

    expect(passwordService.hashPassword).not.toHaveBeenCalled();
    expect(usersRepository.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  it('hashes the password before updating a user', async () => {
    const updateUserDto = updateUserDtoMock({
      password: 'new-secret',
    });
    const updatedUser = createUserMock({
      name: 'Updated Name',
      password: 'new-hashed-password',
    });

    passwordService.hashPassword.mockResolvedValue('new-hashed-password');
    usersRepository.update.mockResolvedValue(updatedUser);

    await expect(service.update(1, updateUserDto)).resolves.toEqual(
      updatedUser,
    );

    expect(passwordService.hashPassword).toHaveBeenCalledWith('new-secret');
    expect(usersRepository.update).toHaveBeenCalledWith(1, {
      ...updateUserDto,
      password: 'new-hashed-password',
    });
  });

  it('delegates remove to the repository', async () => {
    const user = createUserMock();

    usersRepository.delete.mockResolvedValue(user);

    await expect(service.remove(1)).resolves.toEqual(user);
    expect(usersRepository.delete).toHaveBeenCalledWith(1);
  });
});
