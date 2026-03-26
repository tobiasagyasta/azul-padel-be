import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BlockedSlotsService } from './blocked_slots.service';
import { CreateBlockedSlotDto } from './dto/create-blocked_slot.dto';
import { UpdateBlockedSlotDto } from './dto/update-blocked_slot.dto';
import { BlockedSlot } from './entities/blocked_slot.entity';

@Controller('blocked-slots')
export class BlockedSlotsController {
  constructor(private readonly blockedSlotsService: BlockedSlotsService) {}

  @Post()
  create(
    @Body() createBlockedSlotDto: CreateBlockedSlotDto,
  ): Promise<BlockedSlot> {
    return this.blockedSlotsService.create(createBlockedSlotDto);
  }

  @Get()
  findAll(): Promise<BlockedSlot[]> {
    return this.blockedSlotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BlockedSlot> {
    return this.blockedSlotsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlockedSlotDto: UpdateBlockedSlotDto,
  ): Promise<BlockedSlot> {
    return this.blockedSlotsService.update(id, updateBlockedSlotDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<BlockedSlot> {
    return this.blockedSlotsService.remove(id);
  }
}
