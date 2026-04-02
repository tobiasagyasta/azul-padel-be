import { Test, TestingModule } from '@nestjs/testing';
import { UsersSqlRepository } from './users-sql.repository';
import { UsersSqlService } from './users-sql.service';

describe('UsersSqlService', () => {
  let service: UsersSqlService;
  const usersSqlRepositoryMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersSqlService,
        {
          provide: UsersSqlRepository,
          useValue: usersSqlRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersSqlService>(UsersSqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
