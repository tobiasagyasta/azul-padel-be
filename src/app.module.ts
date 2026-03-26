import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { CourtsModule } from './courts/courts.module';
import { SchedulesModule } from './schedules/schedules.module';
import { BlockedSlotsModule } from './blocked_slots/blocked_slots.module';

@Module({
  imports: [
    UsersModule,
    BookingsModule,
    CourtsModule,
    SchedulesModule,
    BlockedSlotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
