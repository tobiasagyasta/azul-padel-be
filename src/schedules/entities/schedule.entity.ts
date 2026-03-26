import type { Court } from '../../courts/entities/court.entity';

export class Schedule {
  id!: number;
  courtId!: number;
  dayOfWeek!: number;
  openTime!: Date;
  closeTime!: Date;
  createdAt!: Date;
  court?: Court;
}
