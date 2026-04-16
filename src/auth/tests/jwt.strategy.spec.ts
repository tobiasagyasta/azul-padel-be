import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { JwtStrategy } from '../jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  const originalJwtSecret = process.env.JWT_SECRET;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'test-jwt-secret';

    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should define the testing module and strategy instance', () => {
    expect(strategy).toBeDefined();
  });

  it('should map the JWT payload into the authenticated request user shape', async () => {
    await expect(
      strategy.validate({
        sub: 1,
        username: 'azul-user',
        role: Role.ADMIN,
      }),
    ).resolves.toEqual({
      userId: 1,
      username: 'azul-user',
      role: Role.ADMIN,
    });
  });

  afterEach(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  });
});
