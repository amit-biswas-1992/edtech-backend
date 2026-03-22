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
import { SitesService } from './sites.service.js';
import { CreateSiteDto } from './dto/create-site.dto.js';
import { UpdateSiteDto } from './dto/update-site.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';

@ApiTags('Sites')
@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new site' })
  @ApiResponse({ status: 201, description: 'Site created successfully' })
  async create(@CurrentUser() user: UserEntity, @Body() dto: CreateSiteDto) {
    return this.sitesService.create(user.id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all sites for the current user' })
  @ApiResponse({ status: 200, description: 'List of user sites' })
  async findAll(@CurrentUser() user: UserEntity) {
    return this.sitesService.findAllByUser(user.id);
  }

  @Get('resolve/:subdomain')
  @ApiOperation({ summary: 'Resolve a site by subdomain' })
  @ApiResponse({ status: 200, description: 'Site data' })
  @ApiResponse({ status: 404, description: 'Site not found' })
  async findBySubdomain(@Param('subdomain') subdomain: string) {
    return this.sitesService.findBySubdomain(subdomain);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a site by ID' })
  @ApiResponse({ status: 200, description: 'Site details' })
  @ApiResponse({ status: 404, description: 'Site not found' })
  async findById(@Param('id') id: string) {
    return this.sitesService.findById(id);
  }

  @Get(':slug/preview')
  @ApiOperation({ summary: 'Get a site by slug for public preview' })
  @ApiResponse({ status: 200, description: 'Site preview data' })
  @ApiResponse({ status: 404, description: 'Site not found' })
  async findBySlug(@Param('slug') slug: string) {
    return this.sitesService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a site' })
  @ApiResponse({ status: 200, description: 'Site updated successfully' })
  @ApiResponse({ status: 404, description: 'Site not found' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateSiteDto,
  ) {
    return this.sitesService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a site' })
  @ApiResponse({ status: 200, description: 'Site deleted successfully' })
  @ApiResponse({ status: 404, description: 'Site not found' })
  async delete(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    await this.sitesService.delete(id, user.id);
    return { message: 'Site deleted successfully' };
  }
}
