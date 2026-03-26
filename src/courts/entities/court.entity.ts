import type { BlockedSlot } from '../../blocked_slots/entities/blocked_slot.entity';
import type { Booking } from '../../bookings/entities/booking.entity';
import type { Schedule } from '../../schedules/entities/schedule.entity';

export class Court {
  id!: number;
  name!: string;
  description?: string | null;
  location!: string;
  createdAt!: Date;
  schedules?: Schedule[];
  bookings?: Booking[];
  blockedSlots?: BlockedSlot[];
}
