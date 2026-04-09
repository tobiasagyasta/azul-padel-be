import { Role } from '@prisma/client';
import type { Booking } from '../../bookings/entities/booking.entity';

export class User {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: Role;
  createdAt!: Date;
  bookings?: Booking[];
}
