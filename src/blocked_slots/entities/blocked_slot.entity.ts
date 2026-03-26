import type { Court } from '../../courts/entities/court.entity';

export class BlockedSlot {
  id!: number;
  courtId!: number;
  startTime!: Date;
  endTime!: Date;
  reason?: string | null;
  createdAt!: Date;
  court?: Court;
}
