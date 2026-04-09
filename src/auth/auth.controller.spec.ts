import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

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
    const loginDto: LoginDto = { username: 'azul', password: 'secret' };
    authService.login.mockResolvedValue({ access_token: 'token' });

    await expect(controller.login(loginDto)).resolves.toEqual({
      access_token: 'token',
    });
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });

  it('delegates logout to AuthService', () => {
    authService.logout.mockReturnValue({ message: 'ok' });

    expect(controller.logout()).toEqual({ message: 'ok' });
    expect(authService.logout).toHaveBeenCalled();
  });

  it('loads the authenticated user profile', async () => {
    authService.getProfile.mockResolvedValue({ id: 1, username: 'azul' });

    await expect(
      controller.getProfile({
        user: { userId: 1, username: 'azul' },
      } as never),
    ).resolves.toEqual({ id: 1, username: 'azul' });

    expect(authService.getProfile).toHaveBeenCalledWith(1);
  });
});
