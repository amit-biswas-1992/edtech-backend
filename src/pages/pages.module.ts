import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitePageEntity } from '../entities/site-page.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { PagesService } from './pages.service.js';
import { PagesController } from './pages.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SitePageEntity, SiteEntity])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
