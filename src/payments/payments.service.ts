import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PaymentEntity,
  PaymentStatus,
} from '../entities/payment.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import {
  EnrollmentEntity,
  EnrollmentStatus,
  PaymentStatus as EnrollmentPaymentStatus,
} from '../entities/enrollment.entity.js';
import { InitiatePaymentDto } from './dto/initiate-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(SiteEntity)
    private readonly siteRepository: Repository<SiteEntity>,
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  private async verifySiteOwnership(
    siteId: string,
    userId: string,
  ): Promise<SiteEntity> {
    const site = await this.siteRepository.findOne({ where: { id: siteId } });
    if (!site) {
      throw new NotFoundException('Site not found');
    }
    if (site.userId !== userId) {
      throw new ForbiddenException('You do not own this site');
    }
    return site;
  }

  async initiatePayment(
    siteId: string,
    studentId: string,
    dto: InitiatePaymentDto,
  ): Promise<{ paymentId: string; redirectUrl: string }> {
    const site = await this.siteRepository.findOne({ where: { id: siteId } });
    if (!site) {
      throw new NotFoundException('Site not found');
    }

    const payment = this.paymentRepository.create({
      siteId,
      studentId,
      courseId: dto.courseId,
      enrollmentId: dto.enrollmentId || undefined,
      amount: dto.amount,
      currency: dto.currency || 'BDT',
      method: dto.method,
      status: PaymentStatus.PENDING,
    });

    const savedPayment = await this.paymentRepository.save(payment);

    // Stub redirect URL - would be bKash/Nagad gateway URL in production
    const redirectUrl = `https://payment-gateway.stub/${dto.method}/pay?paymentId=${savedPayment.id}&amount=${dto.amount}`;

    return {
      paymentId: savedPayment.id,
      redirectUrl,
    };
  }

  async handleBkashCallback(
    siteId: string,
    body: Record<string, any>,
  ): Promise<PaymentEntity> {
    const paymentId = body.paymentId as string;
    const transactionId = body.trxID as string;
    const status = body.status as string;

    if (!paymentId) {
      throw new BadRequestException('Missing paymentId');
    }

    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId, siteId },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (transactionId) payment.transactionId = transactionId;
    if (body.paymentID) payment.providerRef = body.paymentID;
    payment.metadata = body;

    if (status === 'success' || status === 'Completed') {
      payment.status = PaymentStatus.COMPLETED;
      await this.onPaymentSuccess(payment);
    } else {
      payment.status = PaymentStatus.FAILED;
    }

    return this.paymentRepository.save(payment);
  }

  async handleNagadCallback(
    siteId: string,
    body: Record<string, any>,
  ): Promise<PaymentEntity> {
    const paymentId = body.paymentId as string;
    const transactionId = body.transactionId as string;
    const status = body.status as string;

    if (!paymentId) {
      throw new BadRequestException('Missing paymentId');
    }

    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId, siteId },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (transactionId) payment.transactionId = transactionId;
    if (body.referenceId) payment.providerRef = body.referenceId;
    payment.metadata = body;

    if (status === 'Success' || status === 'Completed') {
      payment.status = PaymentStatus.COMPLETED;
      await this.onPaymentSuccess(payment);
    } else {
      payment.status = PaymentStatus.FAILED;
    }

    return this.paymentRepository.save(payment);
  }

  private async onPaymentSuccess(payment: PaymentEntity): Promise<void> {
    if (payment.enrollmentId) {
      const enrollment = await this.enrollmentRepository.findOne({
        where: { id: payment.enrollmentId },
      });
      if (enrollment) {
        enrollment.status = EnrollmentStatus.CONFIRMED;
        enrollment.paymentStatus = EnrollmentPaymentStatus.PAID;
        if (payment.transactionId) {
          enrollment.transactionId = payment.transactionId;
        }
        enrollment.amount = payment.amount;
        await this.enrollmentRepository.save(enrollment);
      }
    }
  }

  async findBySiteId(
    siteId: string,
    userId: string,
  ): Promise<PaymentEntity[]> {
    await this.verifySiteOwnership(siteId, userId);

    return this.paymentRepository.find({
      where: { siteId },
      order: { createdAt: 'DESC' },
      relations: ['student', 'course'],
    });
  }

  async findById(paymentId: string): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['student', 'course', 'enrollment'],
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }
}
