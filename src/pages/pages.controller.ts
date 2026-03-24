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
import { PagesService } from './pages.service.js';
import { CreatePageDto } from './dto/create-page.dto.js';
import { UpdatePageDto } from './dto/update-page.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';

@ApiTags('Pages')
@Controller('sites/:siteId/pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new page' })
  @ApiResponse({ status: 201, description: 'Page created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreatePageDto,
  ) {
    return this.pagesService.create(siteId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pages for a site' })
  @ApiResponse({ status: 200, description: 'List of pages' })
  async findBySiteId(@Param('siteId') siteId: string) {
    return this.pagesService.findBySiteId(siteId);
  }

  @Get(':pageId')
  @ApiOperation({ summary: 'Get a page by ID with sections' })
  @ApiResponse({ status: 200, description: 'Page details with sections' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  async findById(@Param('pageId') pageId: string) {
    return this.pagesService.findById(pageId);
  }

  @Patch(':pageId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a page' })
  @ApiResponse({ status: 200, description: 'Page updated successfully' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('pageId') pageId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdatePageDto,
  ) {
    return this.pagesService.update(pageId, user.id, dto);
  }

  @Delete(':pageId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a page' })
  @ApiResponse({ status: 200, description: 'Page deleted successfully' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('pageId') pageId: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.pagesService.delete(pageId, user.id);
    return { message: 'Page deleted successfully' };
  }

  @Post('reorder')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reorder pages' })
  @ApiResponse({ status: 200, description: 'Pages reordered successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async reorder(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() items: { id: string; order: number }[],
  ) {
    return this.pagesService.reorder(siteId, user.id, items);
  }
}
