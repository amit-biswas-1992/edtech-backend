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
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';
import { CourseCategory } from '../entities/course.entity.js';

@ApiTags('Courses')
@Controller('sites/:siteId/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateCourseDto,
  ) {
    return this.coursesService.create(siteId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses for a site' })
  @ApiQuery({ name: 'category', required: false, enum: CourseCategory })
  @ApiResponse({ status: 200, description: 'List of courses' })
  async findBySiteId(
    @Param('siteId') siteId: string,
    @Query('category') category?: CourseCategory,
  ) {
    return this.coursesService.findBySiteId(siteId, category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({ status: 200, description: 'Course details' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async findById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.coursesService.delete(id, user.id);
    return { message: 'Course deleted successfully' };
  }
}
