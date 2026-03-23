import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteEntity } from '../entities/site.entity.js';
import { SiteSectionEntity } from '../entities/site-section.entity.js';
import { TemplatesService } from '../templates/templates.service.js';
import { CreateSiteDto } from './dto/create-site.dto.js';
import { UpdateSiteDto } from './dto/update-site.dto.js';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(SiteEntity)
    private readonly siteRepository: Repository<SiteEntity>,
    @InjectRepository(SiteSectionEntity)
    private readonly sectionRepository: Repository<SiteSectionEntity>,
    private readonly templatesService: TemplatesService,
  ) {}

  private generateSlug(name: string): string {
    const base = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    const suffix = Math.random().toString(36).substring(2, 8);
    return `${base}-${suffix}`;
  }

  async create(userId: string, dto: CreateSiteDto): Promise<SiteEntity> {
    const template = await this.templatesService.findById(dto.templateId);

    const slug = this.generateSlug(dto.name);

    const site = this.siteRepository.create({
      userId,
      name: dto.name,
      slug,
      templateId: dto.templateId,
      colorTheme: dto.colorTheme || {
        primary: '#4F46E5',
        secondary: '#7C3AED',
        accent: '#C4B5FD',
        background: '#FFFFFF',
        text: '#1F2937',
        name: 'Default',
      },
    });

    const savedSite = await this.siteRepository.save(site);

    // Create sections from template defaults
    const sections = template.defaultSections.map((sectionConfig) => {
      return this.sectionRepository.create({
        siteId: savedSite.id,
        sectionType: sectionConfig.sectionType as any,
        designVariant: sectionConfig.designVariant,
        order: sectionConfig.order,
        isVisible: true,
        content: sectionConfig.defaultContent,
      });
    });

    await this.sectionRepository.save(sections);

    return this.findById(savedSite.id);
  }

  async findAllByUser(userId: string): Promise<SiteEntity[]> {
    return this.siteRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['template'],
    });
  }

  async findById(id: string): Promise<SiteEntity> {
    const site = await this.siteRepository.findOne({
      where: { id },
      relations: ['sections', 'template'],
    });
    if (!site) {
      throw new NotFoundException('Site not found');
    }
    if (site.sections) {
      site.sections.sort((a, b) => a.order - b.order);
    }
    return site;
  }

  async findBySubdomain(subdomain: string): Promise<SiteEntity> {
    const site = await this.siteRepository.findOne({
      where: { subdomain },
      relations: ['sections', 'template', 'courses', 'teachers', 'promos'],
    });
    if (!site) {
      throw new NotFoundException('Site not found');
    }
    if (site.sections) {
      site.sections.sort((a, b) => a.order - b.order);
    }
    return site;
  }

  async findBySlug(slug: string): Promise<SiteEntity> {
    const site = await this.siteRepository.findOne({
      where: { slug },
      relations: ['sections', 'template', 'courses', 'teachers', 'promos'],
    });
    if (!site) {
      throw new NotFoundException('Site not found');
    }
    if (site.sections) {
      site.sections.sort((a, b) => a.order - b.order);
    }
    return site;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateSiteDto,
  ): Promise<SiteEntity> {
    const site = await this.siteRepository.findOne({ where: { id } });
    if (!site) {
      throw new NotFoundException('Site not found');
    }
    if (site.userId !== userId) {
      throw new ForbiddenException('You do not own this site');
    }

    Object.assign(site, dto);
    await this.siteRepository.save(site);
    return this.findById(id);
  }

  async delete(id: string, userId: string): Promise<void> {
    const site = await this.siteRepository.findOne({ where: { id } });
    if (!site) {
      throw new NotFoundException('Site not found');
    }
    if (site.userId !== userId) {
      throw new ForbiddenException('You do not own this site');
    }
    await this.siteRepository.remove(site);
  }
}
