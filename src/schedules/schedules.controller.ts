import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiCreatedResponse({ type: ScheduleResponseDto })
  @Post()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    const schedule = await this.schedulesService.create(createScheduleDto);

    return ScheduleResponseDto.fromEntity(schedule);
  }

  @ApiOkResponse({ type: ScheduleResponseDto, isArray: true })
  @ApiQuery({ name: 'day', required: false, type: Number })
  @ApiQuery({ name: 'courtId', required: false, type: Number })
  @Get()
  async findAll(
    @Query() query: FindSchedulesQueryDto,
  ): Promise<ScheduleResponseDto[]> {
    const schedules = await this.schedulesService.findAll(query);

    return ScheduleResponseDto.fromEntities(schedules);
  }

  @ApiOkResponse({ type: Schedule, isArray: true })
  @ApiQuery({ name: 'day', required: false, type: Number })
  @ApiQuery({ name: 'courtId', required: false, type: Number })
  @Get('raw')
  findAllRaw(@Query() query: FindSchedulesQueryDto): Promise<Schedule[]> {
    return this.schedulesService.findAll(query);
  }

  @ApiOkResponse({ type: ScheduleResponseDto })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ScheduleResponseDto> {
    const schedule = await this.schedulesService.findOne(id);

    return ScheduleResponseDto.fromEntity(schedule);
  }

  @ApiOkResponse({ type: ScheduleResponseDto })
  @ApiParam({ name: 'id', type: Number })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    const schedule = await this.schedulesService.update(id, updateScheduleDto);

    return ScheduleResponseDto.fromEntity(schedule);
  }

  @ApiOkResponse({ type: ScheduleResponseDto })
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ScheduleResponseDto> {
    const schedule = await this.schedulesService.remove(id);

    return ScheduleResponseDto.fromEntity(schedule);
  }
}
