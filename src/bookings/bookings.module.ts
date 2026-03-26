import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';

@Module({
  controllers: [BookingsController],
  providers: [PrismaService, BookingsRepository, BookingsService],
})
export class BookingsModule {}
