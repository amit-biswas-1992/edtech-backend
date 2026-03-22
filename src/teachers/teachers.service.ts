import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherEntity } from '../entities/teacher.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { UpdateTeacherDto } from './dto/update-teacher.dto.js';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>,
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

  async findBySiteId(siteId: string): Promise<TeacherEntity[]> {
    return this.teacherRepository.find({
      where: { siteId },
      order: { order: 'ASC' },
    });
  }

  async findById(id: string): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }

  async create(
    siteId: string,
    userId: string,
    dto: CreateTeacherDto,
  ): Promise<TeacherEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const teacher = this.teacherRepository.create({
      siteId,
      ...dto,
    });

    return this.teacherRepository.save(teacher);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    await this.verifySiteOwnership(teacher.siteId, userId);

    Object.assign(teacher, dto);
    return this.teacherRepository.save(teacher);
  }

  async delete(id: string, userId: string): Promise<void> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    await this.verifySiteOwnership(teacher.siteId, userId);
    await this.teacherRepository.remove(teacher);
  }
}
