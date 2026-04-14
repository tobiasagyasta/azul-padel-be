import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import {
  createUserDtoMock,
  createUserMock,
  updateUserDtoMock,
} from './fixtures/user.fixture';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    usersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates create to UsersService', async () => {
    const createUserDto = createUserDtoMock({
      name: 'Azul Admin',
      username: 'azul',
      email: 'azul@example.com',
      password: 'secret',
      role: Role.ADMIN,
    });
    const user = createUserMock({
      name: 'Azul Admin',
      username: 'azul',
      email: 'azul@example.com',
      role: Role.ADMIN,
    });

    usersService.create.mockResolvedValue(user);

    await expect(controller.create(createUserDto)).resolves.toEqual(user);
    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('delegates findAll to UsersService', async () => {
    const user = createUserMock();

    usersService.findAll.mockResolvedValue([user]);

    await expect(controller.findAll()).resolves.toEqual([user]);
    expect(usersService.findAll).toHaveBeenCalled();
  });

  it('delegates findOne to UsersService', async () => {
    const user = createUserMock();

    usersService.findOne.mockResolvedValue(user);

    await expect(controller.findOne(1)).resolves.toEqual(user);
    expect(usersService.findOne).toHaveBeenCalledWith(1);
  });

  it('delegates update to UsersService', async () => {
    const updateUserDto = updateUserDtoMock({
      name: 'Updated Azul',
      password: 'new-secret',
    });
    const updatedUser = createUserMock({ name: 'Updated Azul' });

    usersService.update.mockResolvedValue(updatedUser);

    await expect(controller.update(1, updateUserDto)).resolves.toEqual(
      updatedUser,
    );
    expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  it('delegates remove to UsersService', async () => {
    const user = createUserMock();

    usersService.remove.mockResolvedValue(user);

    await expect(controller.remove(1)).resolves.toEqual(user);
    expect(usersService.remove).toHaveBeenCalledWith(1);
  });
});
