import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { BookingsRepository } from './bookings.repository';

@Injectable()
export class BookingsService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsRepository.create(this.mapCreateDtoToPrisma(createBookingDto));
  }

  findAll(): Promise<Booking[]> {
    return this.bookingsRepository.findAll();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingsRepository.findById(id);

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    return this.bookingsRepository.update(
      id,
      this.mapUpdateDtoToPrisma(updateBookingDto),
    );
  }

  remove(id: number): Promise<Booking> {
    return this.bookingsRepository.delete(id);
  }

  private mapCreateDtoToPrisma(
    createBookingDto: CreateBookingDto,
  ): Prisma.BookingCreateInput {
    const { userId, courtId, ...bookingData } = createBookingDto;

    return {
      ...bookingData,
      user: {
        connect: { id: userId },
      },
      court: {
        connect: { id: courtId },
      },
    };
  }

  private mapUpdateDtoToPrisma(
    updateBookingDto: UpdateBookingDto,
  ): Prisma.BookingUpdateInput {
    const { userId, courtId, ...bookingData } = updateBookingDto;

    return {
      ...bookingData,
      ...(userId !== undefined
        ? {
            user: {
              connect: { id: userId },
            },
          }
        : {}),
      ...(courtId !== undefined
        ? {
            court: {
              connect: { id: courtId },
            },
          }
        : {}),
    };
  }
}
