import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesRepository } from './schedules.repository';

@Module({
  controllers: [SchedulesController],
  providers: [PrismaService, SchedulesRepository, SchedulesService],
})
export class SchedulesModule {}
