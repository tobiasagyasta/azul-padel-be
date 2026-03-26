import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BlockedSlotsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new blocked slot record.
  create(data: Prisma.BlockedSlotCreateInput) {
    return this.prisma.blockedSlot.create({ data });
  }

  // Return all blocked slot records.
  findAll() {
    return this.prisma.blockedSlot.findMany();
  }

  // Find one blocked slot by its primary key.
  findById(id: number) {
    return this.prisma.blockedSlot.findUnique({
      where: { id },
    });
  }

  // Update one blocked slot by its primary key.
  update(id: number, data: Prisma.BlockedSlotUpdateInput) {
    return this.prisma.blockedSlot.update({
      where: { id },
      data,
    });
  }

  // Delete one blocked slot by its primary key.
  delete(id: number) {
    return this.prisma.blockedSlot.delete({
      where: { id },
    });
  }
}
