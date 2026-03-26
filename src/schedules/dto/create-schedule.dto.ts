import { Type } from 'class-transformer';
import { IsDate, IsInt, Max, Min } from 'class-validator';

export class CreateScheduleDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  courtId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek!: number;

  @Type(() => Date)
  @IsDate()
  openTime!: Date;

  @Type(() => Date)
  @IsDate()
  closeTime!: Date;
}
