import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from '../entities/schedule.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { SchedulesService } from './schedules.service.js';
import { SchedulesController } from './schedules.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, SiteEntity])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
