import { Test, TestingModule } from '@nestjs/testing';
import { UsersSqlController } from './users-sql.controller';
import { UsersSqlService } from './users-sql.service';

describe('UsersSqlController', () => {
  let controller: UsersSqlController;
  const usersSqlServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersSqlController],
      providers: [
        {
          provide: UsersSqlService,
          useValue: usersSqlServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersSqlController>(UsersSqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
