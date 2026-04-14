import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '../../password/password.service';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import {
  createAuthUserMock,
  createLoginDtoMock,
  createSafeUserMock,
} from './fixtures/auth.fixture';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: {
    findByUsername: jest.Mock;
    findOne: jest.Mock;
  };
  let jwtService: {
    sign: jest.Mock;
  };
  let passwordService: {
    comparePassword: jest.Mock;
  };

  beforeEach(async () => {
    usersService = {
      findByUsername: jest.fn(),
      findOne: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
    };

    passwordService = {
      comparePassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: PasswordService,
          useValue: passwordService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns a safe user when credentials are valid', async () => {
    const user = createAuthUserMock();
    const safeUser = createSafeUserMock();

    usersService.findByUsername.mockResolvedValue(user);
    passwordService.comparePassword.mockResolvedValue(true);

    await expect(
      service.validateUser('azul-user', 'plain-secret'),
    ).resolves.toEqual(safeUser);
    expect(usersService.findByUsername).toHaveBeenCalledWith('azul-user');
    expect(passwordService.comparePassword).toHaveBeenCalledWith(
      'plain-secret',
      user.password,
    );
  });

  it('throws UnauthorizedException when the username does not exist', async () => {
    usersService.findByUsername.mockResolvedValue(null);

    await expect(
      service.validateUser('missing-user', 'plain-secret'),
    ).rejects.toThrow(
      new UnauthorizedException('Invalid username or password'),
    );
    expect(usersService.findByUsername).toHaveBeenCalledWith('missing-user');
    expect(passwordService.comparePassword).not.toHaveBeenCalled();
  });

  it('throws UnauthorizedException when the password is invalid', async () => {
    const user = createAuthUserMock();

    usersService.findByUsername.mockResolvedValue(user);
    passwordService.comparePassword.mockResolvedValue(false);

    await expect(
      service.validateUser('azul-user', 'wrong-secret'),
    ).rejects.toThrow(
      new UnauthorizedException('Invalid username or password'),
    );
    expect(passwordService.comparePassword).toHaveBeenCalledWith(
      'wrong-secret',
      user.password,
    );
  });

  it('returns an access token and safe user on login', async () => {
    const user = createAuthUserMock();
    const loginDto = createLoginDtoMock();
    const safeUser = createSafeUserMock();

    usersService.findByUsername.mockResolvedValue(user);
    passwordService.comparePassword.mockResolvedValue(true);
    jwtService.sign.mockReturnValue('signed-token');

    await expect(service.login(loginDto)).resolves.toEqual({
      access_token: 'signed-token',
      user: safeUser,
    });
    expect(jwtService.sign).toHaveBeenCalledWith({
      username: safeUser.username,
      role: safeUser.role,
      sub: safeUser.id,
    });
  });

  it('returns a safe user profile', async () => {
    const user = createAuthUserMock({ id: 7, username: 'profile-user' });
    const safeUser = createSafeUserMock({
      id: 7,
      username: 'profile-user',
    });

    usersService.findOne.mockResolvedValue(user);

    await expect(service.getProfile(7)).resolves.toEqual(safeUser);
    expect(usersService.findOne).toHaveBeenCalledWith(7);
  });

  it('returns the logout message', () => {
    expect(service.logout()).toEqual({
      message:
        'Logged out successfully. Remove the bearer token on the client to complete logout.',
    });
  });
});
