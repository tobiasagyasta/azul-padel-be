import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CourtsService } from './courts.service';
import { CourtsController } from './courts.controller';
import { CourtsRepository } from './courts.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CourtsController],
  providers: [PrismaService, CourtsRepository, CourtsService],
})
export class CourtsModule {}
