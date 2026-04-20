import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../entities/schedule.entity';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export class ScheduleResponseDto {
  @ApiProperty({ example: 12 })
  id!: number;

  @ApiProperty({ example: 3 })
  courtId!: number;

  @ApiProperty({ example: 1, minimum: 0, maximum: 6 })
  dayOfWeek!: number;

  @ApiProperty({ example: 'Monday' })
  dayName!: string;

  @ApiProperty({ example: '08:00' })
  openTime!: string;

  @ApiProperty({ example: '22:00' })
  closeTime!: string;

  @ApiProperty({ example: '08:00 - 22:00' })
  operatingHours!: string;

  @ApiProperty({ example: '2026-04-18T09:30:00.000Z' })
  createdAt!: string;

  static fromEntity(schedule: Schedule): ScheduleResponseDto {
    const openTime = formatTime(schedule.openTime);
    const closeTime = formatTime(schedule.closeTime);

    return {
      id: schedule.id,
      courtId: schedule.courtId,
      dayOfWeek: schedule.dayOfWeek,
      dayName: DAY_NAMES[schedule.dayOfWeek] ?? 'Unknown',
      openTime,
      closeTime,
      operatingHours: `${openTime} - ${closeTime}`,
      createdAt: schedule.createdAt.toISOString(),
    };
  }

  static fromEntities(schedules: Schedule[]): ScheduleResponseDto[] {
    return schedules.map((schedule) => ScheduleResponseDto.fromEntity(schedule));
  }
}

function formatTime(value: Date): string {
  const hours = value.getUTCHours().toString().padStart(2, '0');
  const minutes = value.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
