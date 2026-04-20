import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from '../schedules.controller';
import { SchedulesService } from '../schedules.service';

describe('SchedulesController', () => {
  let controller: SchedulesController;
  let schedulesService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  const schedule = {
    id: 12,
    courtId: 3,
    dayOfWeek: 1,
    openTime: new Date('1970-01-01T08:00:00.000Z'),
    closeTime: new Date('1970-01-01T22:00:00.000Z'),
    createdAt: new Date('2026-04-18T09:30:00.000Z'),
  };

  beforeEach(async () => {
    schedulesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        {
          provide: SchedulesService,
          useValue: schedulesService,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
  });

  it('formats list responses into schedule response DTOs', async () => {
    schedulesService.findAll.mockResolvedValue([schedule]);

    await expect(controller.findAll({})).resolves.toEqual([
      {
        id: 12,
        courtId: 3,
        dayOfWeek: 1,
        dayName: 'Monday',
        openTime: '08:00',
        closeTime: '22:00',
        operatingHours: '08:00 - 22:00',
        createdAt: '2026-04-18T09:30:00.000Z',
      },
    ]);
    expect(schedulesService.findAll).toHaveBeenCalledWith({});
  });

  it('returns the raw schedule list without DTO formatting', async () => {
    schedulesService.findAll.mockResolvedValue([schedule]);

    await expect(controller.findAllRaw({})).resolves.toEqual([schedule]);
    expect(schedulesService.findAll).toHaveBeenCalledWith({});
  });

  it('formats single-item responses into schedule response DTOs', async () => {
    schedulesService.findOne.mockResolvedValue(schedule);

    await expect(controller.findOne(12)).resolves.toEqual({
      id: 12,
      courtId: 3,
      dayOfWeek: 1,
      dayName: 'Monday',
      openTime: '08:00',
      closeTime: '22:00',
      operatingHours: '08:00 - 22:00',
      createdAt: '2026-04-18T09:30:00.000Z',
    });
    expect(schedulesService.findOne).toHaveBeenCalledWith(12);
  });
});
