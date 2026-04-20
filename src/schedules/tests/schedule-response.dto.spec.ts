import {
  ScheduleResponseDto,
  scheduleResponseExample,
} from '../dto/schedule-response.dto';
import { Schedule } from '../entities/schedule.entity';

describe('ScheduleResponseDto', () => {
  const schedule: Schedule = {
    id: 12,
    courtId: 3,
    dayOfWeek: 1,
    openTime: new Date('1970-01-01T08:00:00.000Z'),
    closeTime: new Date('1970-01-01T22:00:00.000Z'),
    createdAt: new Date('2026-04-18T09:30:00.000Z'),
  };

  it('formats a schedule into a neat API response shape', () => {
    expect(ScheduleResponseDto.fromEntity(schedule)).toEqual(
      scheduleResponseExample,
    );
  });

  it('formats a collection of schedules', () => {
    expect(ScheduleResponseDto.fromEntities([schedule])).toEqual([
      scheduleResponseExample,
    ]);
  });
});
