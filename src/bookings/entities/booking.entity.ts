import { BookingStatus } from '../../generated/prisma/enums.js';
import type { Court } from '../../courts/entities/court.entity';
import type { User } from '../../users/entities/user.entity';

export class Booking {
  id!: number;
  userId!: number;
  courtId!: number;
  startTime!: Date;
  endTime!: Date;
  status!: BookingStatus;
  createdAt!: Date;
  user?: User;
  court?: Court;
}
