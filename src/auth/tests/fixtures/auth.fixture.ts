import { LoginDto } from '../../dto/login.dto';
import { User } from '../../../users/entities/user.entity';
import { createUserMock } from '../../../users/tests/fixtures/user.fixture';

type SafeUser = Omit<User, 'password'>;

export function createLoginDtoMock(
  overrides: Partial<LoginDto> = {},
): LoginDto {
  return {
    username: 'azul-user',
    password: 'plain-secret',
    ...overrides,
  };
}

export function createAuthUserMock(overrides: Partial<User> = {}): User {
  return createUserMock(overrides);
}

export function createSafeUserMock(
  overrides: Partial<SafeUser> = {},
): SafeUser {
  const { password: _password, ...safeUser } = createAuthUserMock(
    overrides as Partial<User>,
  );

  return safeUser;
}
