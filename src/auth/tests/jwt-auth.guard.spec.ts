const mockCanActivate = jest.fn();

jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn((strategy: string) =>
    class {
      canActivate(context: unknown) {
        return mockCanActivate(strategy, context);
      }
    },
  ),
}));

import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    mockCanActivate.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
    expect(AuthGuard).toHaveBeenCalledWith('jwt');
  });

  it('delegates canActivate to the passport jwt auth guard', () => {
    const context = {} as ExecutionContext;
    mockCanActivate.mockReturnValue(true);

    expect(guard.canActivate(context)).toBe(true);
    expect(mockCanActivate).toHaveBeenCalledWith('jwt', context);
  });
});
