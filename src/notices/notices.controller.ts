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
import { NoticesService } from './notices.service.js';
import { CreateNoticeDto } from './dto/create-notice.dto.js';
import { UpdateNoticeDto } from './dto/update-notice.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';
import { NoticeType } from '../entities/notice.entity.js';

@ApiTags('Notices')
@Controller('sites/:siteId/notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new notice/announcement' })
  @ApiResponse({ status: 201, description: 'Notice created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateNoticeDto,
  ) {
    return this.noticesService.create(siteId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notices for a site (public)' })
  @ApiQuery({ name: 'type', required: false, enum: NoticeType })
  @ApiQuery({ name: 'pinned', required: false })
  @ApiResponse({ status: 200, description: 'List of notices' })
  async findBySiteId(
    @Param('siteId') siteId: string,
    @Query('type') type?: NoticeType,
    @Query('pinned') pinned?: string,
  ) {
    return this.noticesService.findBySiteId(
      siteId,
      type,
      pinned === 'true' ? true : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notice by ID (public)' })
  @ApiResponse({ status: 200, description: 'Notice details' })
  @ApiResponse({ status: 404, description: 'Notice not found' })
  async findById(@Param('id') id: string) {
    return this.noticesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a notice' })
  @ApiResponse({ status: 200, description: 'Notice updated successfully' })
  @ApiResponse({ status: 404, description: 'Notice not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateNoticeDto,
  ) {
    return this.noticesService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a notice' })
  @ApiResponse({ status: 200, description: 'Notice deleted successfully' })
  @ApiResponse({ status: 404, description: 'Notice not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.noticesService.delete(id, user.id);
    return { message: 'Notice deleted successfully' };
  }
}
