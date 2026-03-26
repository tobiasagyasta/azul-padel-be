import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { Court } from './entities/court.entity';
import { CourtsRepository } from './courts.repository';

@Injectable()
export class CourtsService {
  constructor(private readonly courtsRepository: CourtsRepository) {}

  create(createCourtDto: CreateCourtDto): Promise<Court> {
    const data: Prisma.CourtCreateInput = { ...createCourtDto };
    return this.courtsRepository.create(data);
  }

  findAll(): Promise<Court[]> {
    return this.courtsRepository.findAll();
  }

  async findOne(id: number): Promise<Court> {
    const court = await this.courtsRepository.findById(id);

    if (!court) {
      throw new NotFoundException(`Court with ID ${id} not found`);
    }

    return court;
  }

  update(id: number, updateCourtDto: UpdateCourtDto): Promise<Court> {
    const data: Prisma.CourtUpdateInput = { ...updateCourtDto };
    return this.courtsRepository.update(id, data);
  }

  remove(id: number): Promise<Court> {
    return this.courtsRepository.delete(id);
  }
}
