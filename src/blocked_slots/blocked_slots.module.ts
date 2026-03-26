import { Module } from '@nestjs/common';
import { BlockedSlotsService } from './blocked_slots.service';
import { BlockedSlotsController } from './blocked_slots.controller';

@Module({
  controllers: [BlockedSlotsController],
  providers: [BlockedSlotsService],
})
export class BlockedSlotsModule {}
