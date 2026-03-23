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
import { ResultsService } from './results.service.js';
import { CreateResultDto } from './dto/create-result.dto.js';
import { UpdateResultDto } from './dto/update-result.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';

@ApiTags('Results')
@Controller('sites/:siteId/results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new result/achievement' })
  @ApiResponse({ status: 201, description: 'Result created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateResultDto,
  ) {
    return this.resultsService.create(siteId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all results for a site (public)' })
  @ApiQuery({ name: 'university', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiQuery({ name: 'featured', required: false })
  @ApiResponse({ status: 200, description: 'List of results' })
  async findBySiteId(
    @Param('siteId') siteId: string,
    @Query('university') university?: string,
    @Query('year') year?: string,
    @Query('featured') featured?: string,
  ) {
    return this.resultsService.findBySiteId(
      siteId,
      university,
      year ? parseInt(year, 10) : undefined,
      featured === 'true' ? true : undefined,
    );
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get result statistics (public)' })
  @ApiResponse({ status: 200, description: 'Result stats' })
  async getStats(@Param('siteId') siteId: string) {
    return this.resultsService.getStats(siteId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a result by ID (public)' })
  @ApiResponse({ status: 200, description: 'Result details' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  async findById(@Param('id') id: string) {
    return this.resultsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a result' })
  @ApiResponse({ status: 200, description: 'Result updated successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateResultDto,
  ) {
    return this.resultsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a result' })
  @ApiResponse({ status: 200, description: 'Result deleted successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.resultsService.delete(id, user.id);
    return { message: 'Result deleted successfully' };
  }
}
