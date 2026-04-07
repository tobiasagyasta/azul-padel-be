import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';

@Injectable()
export class SchedulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new schedule record.
  create(data: Prisma.ScheduleCreateInput) {
    return this.prisma.schedule.create({ data });
  }

  // Return all schedule records.
  findAll(query: FindSchedulesQueryDto) {
    const where: Prisma.ScheduleWhereInput = {
      ...(query.day === undefined ? {} : { dayOfWeek: query.day }),
      ...(query.courtId === undefined ? {} : { courtId: query.courtId }),
    };

    return this.prisma.schedule.findMany({
      where: Object.keys(where).length === 0 ? undefined : where,
      orderBy: {
        id: 'asc', // or 'desc'
      },
    });
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
