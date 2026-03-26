import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CourtsService } from './courts.service';
import { CourtsController } from './courts.controller';
import { CourtsRepository } from './courts.repository';

@Module({
  controllers: [CourtsController],
  providers: [PrismaService, CourtsRepository, CourtsService],
})
export class CourtsModule {}
