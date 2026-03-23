import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEntity, DayOfWeek } from '../entities/schedule.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { CreateScheduleDto } from './dto/create-schedule.dto.js';
import { UpdateScheduleDto } from './dto/update-schedule.dto.js';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
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
    dto: CreateScheduleDto,
  ): Promise<ScheduleEntity> {
    await this.verifySiteOwnership(siteId, userId);

    const schedule = this.scheduleRepository.create({
      siteId,
      ...dto,
    });

    return this.scheduleRepository.save(schedule);
  }

  async findBySiteId(
    siteId: string,
    dayOfWeek?: DayOfWeek,
    courseId?: string,
    batchName?: string,
  ): Promise<ScheduleEntity[]> {
    const qb = this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.course', 'course')
      .leftJoinAndSelect('schedule.teacher', 'teacher')
      .where('schedule.siteId = :siteId', { siteId });

    if (dayOfWeek) {
      qb.andWhere('schedule.dayOfWeek = :dayOfWeek', { dayOfWeek });
    }
    if (courseId) {
      qb.andWhere('schedule.courseId = :courseId', { courseId });
    }
    if (batchName) {
      qb.andWhere('schedule.batchName = :batchName', { batchName });
    }

    qb.orderBy('schedule.dayOfWeek', 'ASC').addOrderBy(
      'schedule.startTime',
      'ASC',
    );

    return qb.getMany();
  }

  async findById(id: string): Promise<ScheduleEntity> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['course', 'teacher'],
    });
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
    return schedule;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
    });
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    await this.verifySiteOwnership(schedule.siteId, userId);

    Object.assign(schedule, dto);
    return this.scheduleRepository.save(schedule);
  }

  async delete(id: string, userId: string): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
    });
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    await this.verifySiteOwnership(schedule.siteId, userId);
    await this.scheduleRepository.remove(schedule);
  }
}
