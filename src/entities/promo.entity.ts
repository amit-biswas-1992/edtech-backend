import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { SiteEntity } from './site.entity.js';

export enum PromoType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

@Entity('promos')
@Unique(['siteId', 'code'])
export class PromoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.promos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column()
  code: string;

  @Column({
    type: 'enum',
    enum: PromoType,
  })
  type: PromoType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  minPurchase: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxDiscount: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  descriptionBn: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'int', nullable: true })
  usageLimit: number;

  @Column({ type: 'int', default: 0 })
  usedCount: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  applicableCourseIds: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
