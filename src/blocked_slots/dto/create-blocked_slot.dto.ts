import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateBlockedSlotDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  courtId!: number;

  @Type(() => Date)
  @IsDate()
  startTime!: Date;

  @Type(() => Date)
  @IsDate()
  endTime!: Date;

  @IsOptional()
  @IsString()
  reason?: string;
}
