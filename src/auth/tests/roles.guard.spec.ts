import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: {
    getAllAndOverride: jest.Mock;
  };

  beforeEach(async () => {
    reflector = {
      getAllAndOverride: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: reflector,
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
  });

  function createExecutionContext(request: Record<string, unknown> = {}) {
    const handler = jest.fn();
    const controllerClass = class TestController {};

    return {
      getHandler: jest.fn(() => handler),
      getClass: jest.fn(() => controllerClass),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => request),
      })),
    } as unknown as ExecutionContext;
  }

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('allows access when no role metadata is defined', () => {
    const context = createExecutionContext();

    reflector.getAllAndOverride.mockReturnValue(undefined);

    expect(guard.canActivate(context)).toBe(true);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  });

  it('throws ForbiddenException when the request has no user role', () => {
    const context = createExecutionContext({ user: {} });

    reflector.getAllAndOverride.mockReturnValue([Role.ADMIN]);

    expect(() => guard.canActivate(context)).toThrow(
      new ForbiddenException('User context is missing role information'),
    );
  });

  it('throws ForbiddenException when the user role is not allowed', () => {
    const context = createExecutionContext({
      user: { role: Role.USER },
    });

    reflector.getAllAndOverride.mockReturnValue([Role.ADMIN]);

    expect(() => guard.canActivate(context)).toThrow(
      new ForbiddenException('Require one of these roles: ADMIN'),
    );
  });

  it('allows access when the user has one of the required roles', () => {
    const context = createExecutionContext({
      user: { role: Role.ADMIN },
    });

    reflector.getAllAndOverride.mockReturnValue([Role.ADMIN, Role.USER]);

    expect(guard.canActivate(context)).toBe(true);
  });
});
