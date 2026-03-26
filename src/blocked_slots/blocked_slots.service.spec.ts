import { Test, TestingModule } from '@nestjs/testing';
import { BlockedSlotsService } from './blocked_slots.service';
import { BlockedSlotsRepository } from './blocked-slots.repository';

describe('BlockedSlotsService', () => {
  let service: BlockedSlotsService;
  const blockedSlotsRepositoryMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockedSlotsService,
        {
          provide: BlockedSlotsRepository,
          useValue: blockedSlotsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<BlockedSlotsService>(BlockedSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
