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
import { PromosService } from './promos.service.js';
import { CreatePromoDto } from './dto/create-promo.dto.js';
import { UpdatePromoDto } from './dto/update-promo.dto.js';
import { ValidatePromoDto } from './dto/validate-promo.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';

@ApiTags('Promos')
@Controller('sites/:siteId/promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Post('validate')
  @ApiOperation({ summary: 'Validate a promo code' })
  @ApiResponse({ status: 200, description: 'Promo validation result' })
  @ApiResponse({ status: 400, description: 'Invalid promo code' })
  async validatePromo(
    @Param('siteId') siteId: string,
    @Body() dto: ValidatePromoDto,
  ) {
    return this.promosService.validatePromo(siteId, dto.code, dto.courseId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all promos for a site' })
  @ApiQuery({ name: 'active', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of promos' })
  async findBySiteId(
    @Param('siteId') siteId: string,
    @Query('active') active?: string,
  ) {
    const activeFilter =
      active !== undefined ? active === 'true' : undefined;
    return this.promosService.findBySiteId(siteId, activeFilter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a promo by ID' })
  @ApiResponse({ status: 200, description: 'Promo details' })
  @ApiResponse({ status: 404, description: 'Promo not found' })
  async findById(@Param('id') id: string) {
    return this.promosService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new promo' })
  @ApiResponse({ status: 201, description: 'Promo created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreatePromoDto,
  ) {
    return this.promosService.create(siteId, user.id, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a promo' })
  @ApiResponse({ status: 200, description: 'Promo updated successfully' })
  @ApiResponse({ status: 404, description: 'Promo not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdatePromoDto,
  ) {
    return this.promosService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a promo' })
  @ApiResponse({ status: 200, description: 'Promo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Promo not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    await this.promosService.delete(id, user.id);
    return { message: 'Promo deleted successfully' };
  }
}
