import { Test, TestingModule } from '@nestjs/testing';
import { BlockedSlotsController } from './blocked_slots.controller';
import { BlockedSlotsService } from './blocked_slots.service';

describe('BlockedSlotsController', () => {
  let controller: BlockedSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockedSlotsController],
      providers: [BlockedSlotsService],
    }).compile();

    controller = module.get<BlockedSlotsController>(BlockedSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
