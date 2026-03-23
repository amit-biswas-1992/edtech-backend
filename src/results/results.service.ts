import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultEntity } from '../entities/result.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreateResultDto } from './dto/create-result.dto.js';
import { UpdateResultDto } from './dto/update-result.dto.js';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(ResultEntity)
    private readonly resultRepository: Repository<ResultEntity>,
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
    dto: CreateResultDto,
  ): Promise<ResultEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const result = this.resultRepository.create({
      siteId,
      ...dto,
    });

    return this.resultRepository.save(result);
  }

  async findBySiteId(
    siteId: string,
    university?: string,
    year?: number,
    featured?: boolean,
  ): Promise<ResultEntity[]> {
    const qb = this.resultRepository
      .createQueryBuilder('result')
      .where('result.siteId = :siteId', { siteId });

    if (university) {
      qb.andWhere('result.university = :university', { university });
    }
    if (year) {
      qb.andWhere('result.admissionYear = :year', { year });
    }
    if (featured) {
      qb.andWhere('result.isFeatured = :featured', { featured: true });
    }

    qb.orderBy('result.admissionYear', 'DESC').addOrderBy(
      'result.order',
      'ASC',
    );

    return qb.getMany();
  }

  async getStats(
    siteId: string,
  ): Promise<{
    totalAdmitted: number;
    byUniversity: { name: string; count: number }[];
    byYear: { year: number; count: number }[];
    featuredCount: number;
  }> {
    const results = await this.resultRepository.find({
      where: { siteId },
    });

    const totalAdmitted = results.length;
    const featuredCount = results.filter((r) => r.isFeatured).length;

    const universityMap = new Map<string, number>();
    const yearMap = new Map<number, number>();

    for (const r of results) {
      universityMap.set(r.university, (universityMap.get(r.university) || 0) + 1);
      yearMap.set(r.admissionYear, (yearMap.get(r.admissionYear) || 0) + 1);
    }

    const byUniversity = Array.from(universityMap.entries()).map(
      ([name, count]) => ({ name, count }),
    );
    const byYear = Array.from(yearMap.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => b.year - a.year);

    return { totalAdmitted, byUniversity, byYear, featuredCount };
  }

  async findById(id: string): Promise<ResultEntity> {
    const result = await this.resultRepository.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException('Result not found');
    }
    return result;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateResultDto,
  ): Promise<ResultEntity> {
    const result = await this.resultRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Result not found');
    }

    await this.verifySiteOwnership(result.siteId, userId);

    Object.assign(result, dto);
    return this.resultRepository.save(result);
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.resultRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Result not found');
    }

    await this.verifySiteOwnership(result.siteId, userId);
    await this.resultRepository.remove(result);
  }
}
