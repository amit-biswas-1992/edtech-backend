import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/payment.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { EnrollmentEntity } from '../entities/enrollment.entity.js';
import { PaymentsService } from './payments.service.js';
import { PaymentsController } from './payments.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, SiteEntity, EnrollmentEntity]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
