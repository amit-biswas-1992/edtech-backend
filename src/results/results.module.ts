import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from '../entities/result.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { ResultsService } from './results.service.js';
import { ResultsController } from './results.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity, SiteEntity])],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
