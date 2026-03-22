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
import { SectionsService } from './sections.service.js';
import { UpdateSectionDto } from './dto/update-section.dto.js';
import { ReorderSectionsDto } from './dto/reorder-sections.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';
import { SectionType } from '../entities/site-section.entity.js';

@ApiTags('Sections')
@Controller('sites/:siteId/sections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sections for a site' })
  @ApiResponse({ status: 200, description: 'List of sections' })
  async findBySiteId(@Param('siteId') siteId: string) {
    return this.sectionsService.findBySiteId(siteId);
  }

  @Patch(':sectionId')
  @ApiOperation({ summary: 'Update a section' })
  @ApiResponse({ status: 200, description: 'Section updated' })
  @ApiResponse({ status: 404, description: 'Section not found' })
  async update(
    @Param('sectionId') sectionId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(sectionId, user.id, dto);
  }

  @Post('reorder')
  @ApiOperation({ summary: 'Reorder sections' })
  @ApiResponse({ status: 200, description: 'Sections reordered' })
  async reorder(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: ReorderSectionsDto,
  ) {
    return this.sectionsService.reorder(siteId, user.id, dto);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new section to a site' })
  @ApiResponse({ status: 201, description: 'Section added' })
  async addSection(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body()
    body: {
      sectionType: SectionType;
      content?: Record<string, any>;
      designVariant?: number;
    },
  ) {
    return this.sectionsService.addSection(
      siteId,
      user.id,
      body.sectionType,
      body.content || {},
      body.designVariant || 1,
    );
  }

  @Delete(':sectionId')
  @ApiOperation({ summary: 'Remove a section from a site' })
  @ApiResponse({ status: 200, description: 'Section removed' })
  @ApiResponse({ status: 404, description: 'Section not found' })
  async removeSection(
    @Param('sectionId') sectionId: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.sectionsService.removeSection(sectionId, user.id);
    return { message: 'Section removed successfully' };
  }
}
