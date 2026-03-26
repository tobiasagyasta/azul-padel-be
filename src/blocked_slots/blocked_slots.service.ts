import { Injectable } from '@nestjs/common';
import { CreateBlockedSlotDto } from './dto/create-blocked_slot.dto';
import { UpdateBlockedSlotDto } from './dto/update-blocked_slot.dto';

@Injectable()
export class BlockedSlotsService {
  create(createBlockedSlotDto: CreateBlockedSlotDto) {
    return 'This action adds a new blockedSlot';
  }

  findAll() {
    return `This action returns all blockedSlots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockedSlot`;
  }

  update(id: number, updateBlockedSlotDto: UpdateBlockedSlotDto) {
    return `This action updates a #${id} blockedSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockedSlot`;
  }
}
