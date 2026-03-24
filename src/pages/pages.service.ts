import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SitePageEntity } from '../entities/site-page.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreatePageDto } from './dto/create-page.dto.js';
import { UpdatePageDto } from './dto/update-page.dto.js';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(SitePageEntity)
    private readonly pageRepository: Repository<SitePageEntity>,
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
    dto: CreatePageDto,
  ): Promise<SitePageEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const page = this.pageRepository.create({
      siteId,
      ...dto,
    });

    return this.pageRepository.save(page);
  }

  async findBySiteId(siteId: string): Promise<SitePageEntity[]> {
    return this.pageRepository.find({
      where: { siteId },
      order: { order: 'ASC' },
    });
  }

  async findById(pageId: string): Promise<SitePageEntity> {
    const page = await this.pageRepository.findOne({
      where: { id: pageId },
      relations: ['sections'],
    });
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    if (page.sections) {
      page.sections.sort((a, b) => a.order - b.order);
    }
    return page;
  }

  async update(
    pageId: string,
    userId: string,
    dto: UpdatePageDto,
  ): Promise<SitePageEntity> {
    const page = await this.pageRepository.findOne({ where: { id: pageId } });
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    await this.verifySiteOwnership(page.siteId, userId);

    Object.assign(page, dto);
    await this.pageRepository.save(page);
    return this.findById(pageId);
  }

  async delete(pageId: string, userId: string): Promise<void> {
    const page = await this.pageRepository.findOne({ where: { id: pageId } });
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    await this.verifySiteOwnership(page.siteId, userId);
    await this.pageRepository.remove(page);
  }

  async reorder(
    siteId: string,
    userId: string,
    items: { id: string; order: number }[],
  ): Promise<SitePageEntity[]> {
    await this.verifySiteOwnership(siteId, userId);

    for (const item of items) {
      await this.pageRepository.update(
        { id: item.id, siteId },
        { order: item.order },
      );
    }

    return this.findBySiteId(siteId);
  }
}
