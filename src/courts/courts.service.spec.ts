import { Test, TestingModule } from '@nestjs/testing';
import { CourtsService } from './courts.service';
import { CourtsRepository } from './courts.repository';

describe('CourtsService', () => {
  let service: CourtsService;
  const courtsRepositoryMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourtsService,
        {
          provide: CourtsRepository,
          useValue: courtsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CourtsService>(CourtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
