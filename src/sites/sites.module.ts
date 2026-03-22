import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteEntity } from '../entities/site.entity.js';
import { SiteSectionEntity } from '../entities/site-section.entity.js';
import { SitesService } from './sites.service.js';
import { SitesController } from './sites.controller.js';
import { TemplatesModule } from '../templates/templates.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteEntity, SiteSectionEntity]),
    TemplatesModule,
  ],
  controllers: [SitesController],
  providers: [SitesService],
  exports: [SitesService],
})
export class SitesModule {}
