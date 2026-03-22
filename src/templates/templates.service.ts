import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateEntity } from '../entities/template.entity.js';
import { templateSeeds } from './templates-seed.js';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);

  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  async findAll(): Promise<TemplateEntity[]> {
    return this.templateRepository.find({ order: { createdAt: 'ASC' } });
  }

  async findById(id: string): Promise<TemplateEntity> {
    const template = await this.templateRepository.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }

  async seed(): Promise<void> {
    const count = await this.templateRepository.count();
    if (count > 0) {
      this.logger.log('Templates already seeded, skipping...');
      return;
    }

    this.logger.log('Seeding templates...');
    for (const seed of templateSeeds) {
      const template = this.templateRepository.create(seed);
      await this.templateRepository.save(template);
    }
    this.logger.log(`Seeded ${templateSeeds.length} templates successfully`);
  }
}
