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
import { EnrollmentsService } from './enrollments.service.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';
import { EnrollmentStatus } from '../entities/enrollment.entity.js';

@ApiTags('Enrollments')
@Controller('sites/:siteId/enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new enrollment (public, student-facing)' })
  @ApiResponse({ status: 201, description: 'Enrollment submitted successfully' })
  async create(
    @Param('siteId') siteId: string,
    @Body() dto: CreateEnrollmentDto,
  ) {
    return this.enrollmentsService.create(siteId, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all enrollments for a site' })
  @ApiQuery({ name: 'status', required: false, enum: EnrollmentStatus })
  @ApiQuery({ name: 'courseId', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'List of enrollments' })
  async findBySiteId(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Query('status') status?: EnrollmentStatus,
    @Query('courseId') courseId?: string,
    @Query('search') search?: string,
  ) {
    return this.enrollmentsService.findBySiteId(
      siteId,
      user.id,
      status,
      courseId,
      search,
    );
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get enrollment statistics' })
  @ApiResponse({ status: 200, description: 'Enrollment stats' })
  async getStats(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.enrollmentsService.getStats(siteId, user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get an enrollment by ID' })
  @ApiResponse({ status: 200, description: 'Enrollment details' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  async findById(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.enrollmentsService.findById(id, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an enrollment' })
  @ApiResponse({ status: 200, description: 'Enrollment updated successfully' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an enrollment' })
  @ApiResponse({ status: 200, description: 'Enrollment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.enrollmentsService.delete(id, user.id);
    return { message: 'Enrollment deleted successfully' };
  }
}
