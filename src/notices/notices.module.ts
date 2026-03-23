import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeEntity } from '../entities/notice.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { NoticesService } from './notices.service.js';
import { NoticesController } from './notices.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeEntity, SiteEntity])],
  controllers: [NoticesController],
  providers: [NoticesService],
  exports: [NoticesService],
})
export class NoticesModule {}
