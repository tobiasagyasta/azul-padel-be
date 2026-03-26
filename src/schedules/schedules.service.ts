import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { SchedulesRepository } from './schedules.repository';

@Injectable()
export class SchedulesService {
  constructor(private readonly schedulesRepository: SchedulesRepository) {}

  create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.schedulesRepository.create(
      this.mapCreateDtoToPrisma(createScheduleDto),
    );
  }

  findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.findAll();
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    return this.schedulesRepository.update(
      id,
      this.mapUpdateDtoToPrisma(updateScheduleDto),
    );
  }

  remove(id: number): Promise<Schedule> {
    return this.schedulesRepository.delete(id);
  }

  private mapCreateDtoToPrisma(
    createScheduleDto: CreateScheduleDto,
  ): Prisma.ScheduleCreateInput {
    const { courtId, ...scheduleData } = createScheduleDto;

    return {
      ...scheduleData,
      court: {
        connect: { id: courtId },
      },
    };
  }

  private mapUpdateDtoToPrisma(
    updateScheduleDto: UpdateScheduleDto,
  ): Prisma.ScheduleUpdateInput {
    const { courtId, ...scheduleData } = updateScheduleDto;

    return {
      ...scheduleData,
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
