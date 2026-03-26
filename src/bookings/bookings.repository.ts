import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new booking record.
  create(data: Prisma.BookingCreateInput) {
    return this.prisma.booking.create({ data });
  }

  // Return all booking records.
  findAll() {
    return this.prisma.booking.findMany();
  }

  // Find one booking by its primary key.
  findById(id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }

  // Update one booking by its primary key.
  update(id: number, data: Prisma.BookingUpdateInput) {
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  // Delete one booking by its primary key.
  delete(id: number) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
