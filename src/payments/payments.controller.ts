import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service.js';
import { InitiatePaymentDto } from './dto/initiate-payment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserEntity } from '../entities/user.entity.js';

@ApiTags('Payments')
@Controller('sites/:siteId/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate a payment for a course' })
  @ApiResponse({ status: 201, description: 'Payment initiated, returns redirect URL' })
  async initiatePayment(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: InitiatePaymentDto,
  ) {
    return this.paymentsService.initiatePayment(siteId, user.id, dto);
  }

  @Post('callback/bkash')
  @ApiOperation({ summary: 'bKash payment callback webhook' })
  @ApiResponse({ status: 200, description: 'Callback processed' })
  async bkashCallback(
    @Param('siteId') siteId: string,
    @Body() body: Record<string, any>,
  ) {
    return this.paymentsService.handleBkashCallback(siteId, body);
  }

  @Post('callback/nagad')
  @ApiOperation({ summary: 'Nagad payment callback webhook' })
  @ApiResponse({ status: 200, description: 'Callback processed' })
  async nagadCallback(
    @Param('siteId') siteId: string,
    @Body() body: Record<string, any>,
  ) {
    return this.paymentsService.handleNagadCallback(siteId, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all payments for a site (provider only)' })
  @ApiResponse({ status: 200, description: 'List of payments' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findBySiteId(
    @Param('siteId') siteId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.paymentsService.findBySiteId(siteId, user.id);
  }

  @Get(':paymentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment details' })
  @ApiResponse({ status: 200, description: 'Payment details' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async findById(@Param('paymentId') paymentId: string) {
    return this.paymentsService.findById(paymentId);
  }
}
