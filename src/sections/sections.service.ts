import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSectionEntity, SectionType } from '../entities/site-section.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { UpdateSectionDto } from './dto/update-section.dto.js';
import { ReorderSectionsDto } from './dto/reorder-sections.dto.js';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(SiteSectionEntity)
    private readonly sectionRepository: Repository<SiteSectionEntity>,
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

  async findBySiteId(siteId: string): Promise<SiteSectionEntity[]> {
    return this.sectionRepository.find({
      where: { siteId },
      order: { order: 'ASC' },
    });
  }

  async update(
    sectionId: string,
    userId: string,
    dto: UpdateSectionDto,
  ): Promise<SiteSectionEntity> {
    const section = await this.sectionRepository.findOne({
      where: { id: sectionId },
    });
    if (!section) {
      throw new NotFoundException('Section not found');
    }

    await this.verifySiteOwnership(section.siteId, userId);

    if (dto.content !== undefined) {
      section.content = { ...section.content, ...dto.content };
    }
    if (dto.designVariant !== undefined) {
      section.designVariant = dto.designVariant;
    }
    if (dto.isVisible !== undefined) {
      section.isVisible = dto.isVisible;
    }
    if (dto.order !== undefined) {
      section.order = dto.order;
    }

    return this.sectionRepository.save(section);
  }

  async reorder(
    siteId: string,
    userId: string,
    dto: ReorderSectionsDto,
  ): Promise<SiteSectionEntity[]> {
    await this.verifySiteOwnership(siteId, userId);

    for (const item of dto.sections) {
      await this.sectionRepository.update(item.id, { order: item.order });
    }

    return this.findBySiteId(siteId);
  }

  async addSection(
    siteId: string,
    userId: string,
    sectionType: SectionType,
    content: Record<string, any> = {},
    designVariant = 1,
  ): Promise<SiteSectionEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const existingSections = await this.findBySiteId(siteId);
    const maxOrder =
      existingSections.length > 0
        ? Math.max(...existingSections.map((s) => s.order))
        : 0;

    const section = this.sectionRepository.create({
      siteId,
      sectionType,
      designVariant,
      order: maxOrder + 1,
      isVisible: true,
      content,
    });

    return this.sectionRepository.save(section);
  }

  async removeSection(
    sectionId: string,
    userId: string,
  ): Promise<void> {
    const section = await this.sectionRepository.findOne({
      where: { id: sectionId },
    });
    if (!section) {
      throw new NotFoundException('Section not found');
    }

    await this.verifySiteOwnership(section.siteId, userId);
    await this.sectionRepository.remove(section);
  }
}
