import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SiteEntity } from './site.entity.js';

export enum NoticeType {
  GENERAL = 'general',
  EXAM = 'exam',
  SCHEDULE = 'schedule',
  ADMISSION = 'admission',
  RESULT = 'result',
  URGENT = 'urgent',
}

@Entity('notices')
export class NoticeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.notices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleBn: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  contentBn: string;

  @Column({ type: 'enum', enum: NoticeType, default: NoticeType.GENERAL })
  type: NoticeType;

  @Column({ default: false })
  isPinned: boolean;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
