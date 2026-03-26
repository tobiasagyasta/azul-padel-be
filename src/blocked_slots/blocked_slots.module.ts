import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BlockedSlotsService } from './blocked_slots.service';
import { BlockedSlotsController } from './blocked_slots.controller';
import { BlockedSlotsRepository } from './blocked-slots.repository';

@Module({
  controllers: [BlockedSlotsController],
  providers: [PrismaService, BlockedSlotsRepository, BlockedSlotsService],
})
export class BlockedSlotsModule {}
