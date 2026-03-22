import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity, CourseCategory } from '../entities/course.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
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
    category?: CourseCategory,
  ): Promise<CourseEntity[]> {
    const where: any = { siteId };
    if (category) {
      where.category = category;
    }

    return this.courseRepository.find({
      where,
      order: { order: 'ASC' },
      relations: ['teacher'],
    });
  }

  async findById(id: string): Promise<CourseEntity> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['teacher'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async create(
    siteId: string,
    userId: string,
    dto: CreateCourseDto,
  ): Promise<CourseEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const course = this.courseRepository.create({
      siteId,
      ...dto,
    });

    return this.courseRepository.save(course);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateCourseDto,
  ): Promise<CourseEntity> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.verifySiteOwnership(course.siteId, userId);

    Object.assign(course, dto);
    return this.courseRepository.save(course);
  }

  async delete(id: string, userId: string): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.verifySiteOwnership(course.siteId, userId);
    await this.courseRepository.remove(course);
  }
}
