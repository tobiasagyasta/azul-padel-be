import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SchedulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new schedule record.
  create(data: Prisma.ScheduleCreateInput) {
    return this.prisma.schedule.create({ data });
  }

  // Return all schedule records.
  findAll() {
    return this.prisma.schedule.findMany();
  }

  // Find one schedule by its primary key.
  findById(id: number) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  // Update one schedule by its primary key.
  update(id: number, data: Prisma.ScheduleUpdateInput) {
    return this.prisma.schedule.update({
      where: { id },
      data,
    });
  }

  // Delete one schedule by its primary key.
  delete(id: number) {
    return this.prisma.schedule.delete({
      where: { id },
    });
  }
}
