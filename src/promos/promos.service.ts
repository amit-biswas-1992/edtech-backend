import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromoEntity } from '../entities/promo.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreatePromoDto } from './dto/create-promo.dto.js';
import { UpdatePromoDto } from './dto/update-promo.dto.js';

@Injectable()
export class PromosService {
  constructor(
    @InjectRepository(PromoEntity)
    private readonly promoRepository: Repository<PromoEntity>,
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

  async findBySiteId(
    siteId: string,
    active?: boolean,
  ): Promise<PromoEntity[]> {
    if (active) {
      const now = new Date().toISOString().split('T')[0];
      const qb = this.promoRepository
        .createQueryBuilder('promo')
        .where('promo.siteId = :siteId', { siteId })
        .andWhere('promo.isActive = :isActive', { isActive: true })
        .andWhere('promo.startDate <= :now', { now })
        .andWhere('promo.endDate >= :now', { now })
        .orderBy('promo.createdAt', 'DESC');
      return qb.getMany();
    }

    const where: any = { siteId };
    return this.promoRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<PromoEntity> {
    const promo = await this.promoRepository.findOne({ where: { id } });
    if (!promo) {
      throw new NotFoundException('Promo not found');
    }
    return promo;
  }

  async create(
    siteId: string,
    userId: string,
    dto: CreatePromoDto,
  ): Promise<PromoEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const promo = this.promoRepository.create({
      siteId,
      ...dto,
    });

    return this.promoRepository.save(promo);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdatePromoDto,
  ): Promise<PromoEntity> {
    const promo = await this.promoRepository.findOne({ where: { id } });
    if (!promo) {
      throw new NotFoundException('Promo not found');
    }

    await this.verifySiteOwnership(promo.siteId, userId);

    Object.assign(promo, dto);
    return this.promoRepository.save(promo);
  }

  async delete(id: string, userId: string): Promise<void> {
    const promo = await this.promoRepository.findOne({ where: { id } });
    if (!promo) {
      throw new NotFoundException('Promo not found');
    }

    await this.verifySiteOwnership(promo.siteId, userId);
    await this.promoRepository.remove(promo);
  }

  async validatePromo(
    siteId: string,
    code: string,
    courseId?: string,
  ): Promise<{ valid: boolean; promo?: PromoEntity; message?: string }> {
    const promo = await this.promoRepository.findOne({
      where: { siteId, code: code.toUpperCase() },
    });

    if (!promo) {
      return { valid: false, message: 'Promo code not found' };
    }

    if (!promo.isActive) {
      return { valid: false, message: 'Promo code is not active' };
    }

    const now = new Date();
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);

    if (now < startDate) {
      return { valid: false, message: 'Promo code is not yet valid' };
    }

    if (now > endDate) {
      return { valid: false, message: 'Promo code has expired' };
    }

    if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) {
      return { valid: false, message: 'Promo code usage limit reached' };
    }

    if (
      courseId &&
      promo.applicableCourseIds &&
      promo.applicableCourseIds.length > 0 &&
      !promo.applicableCourseIds.includes(courseId)
    ) {
      return { valid: false, message: 'Promo code is not applicable for this course' };
    }

    return { valid: true, promo };
  }
}
