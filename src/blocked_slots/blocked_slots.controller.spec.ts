import { Test, TestingModule } from '@nestjs/testing';
import { BlockedSlotsController } from './blocked_slots.controller';
import { BlockedSlotsService } from './blocked_slots.service';

describe('BlockedSlotsController', () => {
  let controller: BlockedSlotsController;
  const blockedSlotsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockedSlotsController],
      providers: [
        {
          provide: BlockedSlotsService,
          useValue: blockedSlotsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<BlockedSlotsController>(BlockedSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
