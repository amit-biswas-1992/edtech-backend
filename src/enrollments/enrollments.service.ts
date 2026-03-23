import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {
  EnrollmentEntity,
  EnrollmentStatus,
} from '../entities/enrollment.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto.js';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    @InjectRepository(SiteEntity)
    private readonly siteRepository: Repository<SiteEntity>,
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

  async create(
    siteId: string,
    dto: CreateEnrollmentDto,
  ): Promise<EnrollmentEntity> {
    const site = await this.siteRepository.findOne({ where: { id: siteId } });
    if (!site) {
      throw new NotFoundException('Site not found');
    }

    const enrollment = this.enrollmentRepository.create({
      siteId,
      ...dto,
    });

    return this.enrollmentRepository.save(enrollment);
  }

  async findBySiteId(
    siteId: string,
    userId: string,
    status?: EnrollmentStatus,
    courseId?: string,
    search?: string,
  ): Promise<EnrollmentEntity[]> {
    await this.verifySiteOwnership(siteId, userId);

    const qb = this.enrollmentRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .where('enrollment.siteId = :siteId', { siteId });

    if (status) {
      qb.andWhere('enrollment.status = :status', { status });
    }
    if (courseId) {
      qb.andWhere('enrollment.courseId = :courseId', { courseId });
    }
    if (search) {
      qb.andWhere(
        '(enrollment.studentName ILIKE :search OR enrollment.studentPhone ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    qb.orderBy('enrollment.createdAt', 'DESC');

    return qb.getMany();
  }

  async getStats(
    siteId: string,
    userId: string,
  ): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    waitlisted: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    await this.verifySiteOwnership(siteId, userId);

    const enrollments = await this.enrollmentRepository.find({
      where: { siteId },
    });

    const total = enrollments.length;
    const pending = enrollments.filter(
      (e) => e.status === EnrollmentStatus.PENDING,
    ).length;
    const confirmed = enrollments.filter(
      (e) => e.status === EnrollmentStatus.CONFIRMED,
    ).length;
    const waitlisted = enrollments.filter(
      (e) => e.status === EnrollmentStatus.WAITLISTED,
    ).length;
    const cancelled = enrollments.filter(
      (e) => e.status === EnrollmentStatus.CANCELLED,
    ).length;
    const totalRevenue = enrollments.reduce(
      (sum, e) => sum + (Number(e.amount) || 0),
      0,
    );

    return { total, pending, confirmed, waitlisted, cancelled, totalRevenue };
  }

  async findById(id: string, userId: string): Promise<EnrollmentEntity> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
      relations: ['course'],
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.verifySiteOwnership(enrollment.siteId, userId);
    return enrollment;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateEnrollmentDto,
  ): Promise<EnrollmentEntity> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.verifySiteOwnership(enrollment.siteId, userId);

    Object.assign(enrollment, dto);
    return this.enrollmentRepository.save(enrollment);
  }

  async delete(id: string, userId: string): Promise<void> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.verifySiteOwnership(enrollment.siteId, userId);
    await this.enrollmentRepository.remove(enrollment);
  }
}
