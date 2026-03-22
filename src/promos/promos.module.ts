import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoEntity } from '../entities/promo.entity.js';
import { SiteEntity } from '../entities/site.entity.js';
import { PromosService } from './promos.service.js';
import { PromosController } from './promos.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([PromoEntity, SiteEntity])],
  controllers: [PromosController],
  providers: [PromosService],
  exports: [PromosService],
})
export class PromosModule {}
