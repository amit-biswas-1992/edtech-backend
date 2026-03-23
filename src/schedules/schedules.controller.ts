import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SchedulesService } from './schedules.service.js';
import { CreateScheduleDto } from './dto/create-schedule.dto.js';
import { UpdateScheduleDto } from './dto/update-schedule.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';
import { DayOfWeek } from '../entities/schedule.entity.js';

@ApiTags('Schedules')
@Controller('sites/:siteId/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiResponse({ status: 201, description: 'Schedule created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateScheduleDto,
  ) {
    return this.schedulesService.create(siteId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules for a site (public)' })
  @ApiQuery({ name: 'dayOfWeek', required: false, enum: DayOfWeek })
  @ApiQuery({ name: 'courseId', required: false })
  @ApiQuery({ name: 'batchName', required: false })
  @ApiResponse({ status: 200, description: 'List of schedules' })
  async findBySiteId(
    @Param('siteId') siteId: string,
    @Query('dayOfWeek') dayOfWeek?: DayOfWeek,
    @Query('courseId') courseId?: string,
    @Query('batchName') batchName?: string,
  ) {
    return this.schedulesService.findBySiteId(
      siteId,
      dayOfWeek,
      courseId,
      batchName,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a schedule by ID (public)' })
  @ApiResponse({ status: 200, description: 'Schedule details' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async findById(@Param('id') id: string) {
    return this.schedulesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a schedule' })
  @ApiResponse({ status: 200, description: 'Schedule updated successfully' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a schedule' })
  @ApiResponse({ status: 200, description: 'Schedule deleted successfully' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.schedulesService.delete(id, user.id);
    return { message: 'Schedule deleted successfully' };
  }
}
