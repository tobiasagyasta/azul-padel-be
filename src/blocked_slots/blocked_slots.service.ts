import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { CreateBlockedSlotDto } from './dto/create-blocked_slot.dto';
import { UpdateBlockedSlotDto } from './dto/update-blocked_slot.dto';
import { BlockedSlot } from './entities/blocked_slot.entity';
import { BlockedSlotsRepository } from './blocked-slots.repository';

@Injectable()
export class BlockedSlotsService {
  constructor(
    private readonly blockedSlotsRepository: BlockedSlotsRepository,
  ) {}

  create(createBlockedSlotDto: CreateBlockedSlotDto): Promise<BlockedSlot> {
    return this.blockedSlotsRepository.create(
      this.mapCreateDtoToPrisma(createBlockedSlotDto),
    );
  }

  findAll(): Promise<BlockedSlot[]> {
    return this.blockedSlotsRepository.findAll();
  }

  async findOne(id: number): Promise<BlockedSlot> {
    const blockedSlot = await this.blockedSlotsRepository.findById(id);

    if (!blockedSlot) {
      throw new NotFoundException(`Blocked slot with ID ${id} not found`);
    }

    return blockedSlot;
  }

  update(
    id: number,
    updateBlockedSlotDto: UpdateBlockedSlotDto,
  ): Promise<BlockedSlot> {
    return this.blockedSlotsRepository.update(
      id,
      this.mapUpdateDtoToPrisma(updateBlockedSlotDto),
    );
  }

  remove(id: number): Promise<BlockedSlot> {
    return this.blockedSlotsRepository.delete(id);
  }

  private mapCreateDtoToPrisma(
    createBlockedSlotDto: CreateBlockedSlotDto,
  ): Prisma.BlockedSlotCreateInput {
    const { courtId, ...blockedSlotData } = createBlockedSlotDto;

    return {
      ...blockedSlotData,
      court: {
        connect: { id: courtId },
      },
    };
  }

  private mapUpdateDtoToPrisma(
    updateBlockedSlotDto: UpdateBlockedSlotDto,
  ): Prisma.BlockedSlotUpdateInput {
    const { courtId, ...blockedSlotData } = updateBlockedSlotDto;

    return {
      ...blockedSlotData,
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
