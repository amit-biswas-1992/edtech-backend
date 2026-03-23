import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticeEntity, NoticeType } from '../entities/notice.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreateNoticeDto } from './dto/create-notice.dto.js';
import { UpdateNoticeDto } from './dto/update-notice.dto.js';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(NoticeEntity)
    private readonly noticeRepository: Repository<NoticeEntity>,
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
    userId: string,
    dto: CreateNoticeDto,
  ): Promise<NoticeEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const notice = this.noticeRepository.create({
      siteId,
      ...dto,
    });

    return this.noticeRepository.save(notice);
  }

  async findBySiteId(
    siteId: string,
    type?: NoticeType,
    pinned?: boolean,
  ): Promise<NoticeEntity[]> {
    const qb = this.noticeRepository
      .createQueryBuilder('notice')
      .where('notice.siteId = :siteId', { siteId })
      .andWhere('notice.isPublished = :isPublished', { isPublished: true })
      .andWhere(
        '(notice.expiryDate IS NULL OR notice.expiryDate >= :now)',
        { now: new Date() },
      );

    if (type) {
      qb.andWhere('notice.type = :type', { type });
    }
    if (pinned) {
      qb.andWhere('notice.isPinned = :pinned', { pinned: true });
    }

    qb.orderBy('notice.isPinned', 'DESC').addOrderBy(
      'notice.publishDate',
      'DESC',
    );

    return qb.getMany();
  }

  async findById(id: string): Promise<NoticeEntity> {
    const notice = await this.noticeRepository.findOne({
      where: { id },
    });
    if (!notice) {
      throw new NotFoundException('Notice not found');
    }
    return notice;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateNoticeDto,
  ): Promise<NoticeEntity> {
    const notice = await this.noticeRepository.findOne({ where: { id } });
    if (!notice) {
      throw new NotFoundException('Notice not found');
    }

    await this.verifySiteOwnership(notice.siteId, userId);

    Object.assign(notice, dto);
    return this.noticeRepository.save(notice);
  }

  async delete(id: string, userId: string): Promise<void> {
    const notice = await this.noticeRepository.findOne({ where: { id } });
    if (!notice) {
      throw new NotFoundException('Notice not found');
    }

    await this.verifySiteOwnership(notice.siteId, userId);
    await this.noticeRepository.remove(notice);
  }
}
