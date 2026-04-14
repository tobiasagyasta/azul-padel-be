import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import {
  createLoginDtoMock,
  createSafeUserMock,
} from './fixtures/auth.fixture';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: {
    login: jest.Mock;
    logout: jest.Mock;
    getProfile: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
      logout: jest.fn(),
      getProfile: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates login to AuthService', async () => {
    const loginDto = createLoginDtoMock();
    const safeUser = createSafeUserMock();

    authService.login.mockResolvedValue({
      access_token: 'signed-token',
      user: safeUser,
    });

    await expect(controller.login(loginDto)).resolves.toEqual({
      access_token: 'signed-token',
      user: safeUser,
    });
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });

  it('delegates logout to AuthService', () => {
    authService.logout.mockReturnValue({
      message:
        'Logged out successfully. Remove the bearer token on the client to complete logout.',
    });

    expect(controller.logout()).toEqual({
      message:
        'Logged out successfully. Remove the bearer token on the client to complete logout.',
    });
    expect(authService.logout).toHaveBeenCalled();
  });

  it('loads the authenticated user profile from AuthService', async () => {
    const safeUser = createSafeUserMock({
      id: 2,
      username: 'admin-user',
      role: Role.ADMIN,
    });

    authService.getProfile.mockResolvedValue(safeUser);

    await expect(
      controller.getProfile({
        user: {
          userId: 2,
          username: 'admin-user',
          role: Role.ADMIN,
        },
      } as never),
    ).resolves.toEqual(safeUser);

    expect(authService.getProfile).toHaveBeenCalledWith(2);
  });
});
