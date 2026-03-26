import { Test, TestingModule } from '@nestjs/testing';
import { BlockedSlotsService } from './blocked_slots.service';

describe('BlockedSlotsService', () => {
  let service: BlockedSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockedSlotsService],
    }).compile();

    service = module.get<BlockedSlotsService>(BlockedSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
