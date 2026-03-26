import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CourtsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new court record.
  create(data: Prisma.CourtCreateInput) {
    return this.prisma.court.create({ data });
  }

  // Return all court records.
  findAll() {
    return this.prisma.court.findMany();
  }

  // Find one court by its primary key.
  findById(id: number) {
    return this.prisma.court.findUnique({
      where: { id },
    });
  }

  // Update one court by its primary key.
  update(id: number, data: Prisma.CourtUpdateInput) {
    return this.prisma.court.update({
      where: { id },
      data,
    });
  }

  // Delete one court by its primary key.
  delete(id: number) {
    return this.prisma.court.delete({
      where: { id },
    });
  }
}
