const prismaClientMock = jest
  .fn()
  .mockImplementation(function (this: any, options: unknown) {
    this.options = options;
    this.$connect = jest.fn();
    this.$disconnect = jest.fn();
  });

const prismaPgMock = jest
  .fn()
  .mockImplementation((options: unknown) => ({ options }));

jest.mock('@prisma/client', () => ({
  PrismaClient: prismaClientMock,
}));

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: prismaPgMock,
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  const originalDatabaseUrl = process.env.DATABASE_URL;
  const testDatabaseUrl = 'test-database-url';
  let service: PrismaService;

  beforeEach(async () => {
    process.env.DATABASE_URL = testDatabaseUrl;

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }

    prismaClientMock.mockClear();
    prismaPgMock.mockClear();
  });

  it('should define the testing module and service instance', () => {
    expect(service).toBeDefined();
    expect(service.$connect).toBeDefined();
    expect(service.$disconnect).toBeDefined();
  });

  it('should initialize Prisma with the DATABASE_URL env through PrismaPg', () => {
    expect(prismaPgMock).toHaveBeenCalledWith({
      connectionString: testDatabaseUrl,
    });

    expect(prismaClientMock).toHaveBeenCalledWith({
      adapter: {
        options: {
          connectionString: testDatabaseUrl,
        },
      },
    });
  });
});
