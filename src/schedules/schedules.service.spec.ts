import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { SchedulesRepository } from './schedules.repository';

describe('SchedulesService', () => {
  let service: SchedulesService;
  const schedulesRepositoryMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: SchedulesRepository,
          useValue: schedulesRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
