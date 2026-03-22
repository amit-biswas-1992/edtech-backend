import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSectionEntity } from '../entities/site-section.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { SectionsService } from './sections.service.js';
import { SectionsController } from './sections.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSectionEntity, SiteEntity])],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
