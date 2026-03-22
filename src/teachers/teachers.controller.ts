import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TeachersService } from './teachers.service.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { UpdateTeacherDto } from './dto/update-teacher.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';

@ApiTags('Teachers')
@Controller('sites/:siteId/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiResponse({ status: 201, description: 'Teacher created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateTeacherDto,
  ) {
    return this.teachersService.create(siteId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teachers for a site' })
  @ApiResponse({ status: 200, description: 'List of teachers' })
  async findBySiteId(@Param('siteId') siteId: string) {
    return this.teachersService.findBySiteId(siteId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by ID' })
  @ApiResponse({ status: 200, description: 'Teacher details' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  async findById(@Param('id') id: string) {
    return this.teachersService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a teacher' })
  @ApiResponse({ status: 200, description: 'Teacher updated successfully' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateTeacherDto,
  ) {
    return this.teachersService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a teacher' })
  @ApiResponse({ status: 200, description: 'Teacher deleted successfully' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.teachersService.delete(id, user.id);
    return { message: 'Teacher deleted successfully' };
  }
}
