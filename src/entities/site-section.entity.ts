import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SiteEntity } from './site.entity.js';
import { SitePageEntity } from './site-page.entity.js';

export enum SectionType {
  HERO = 'hero',
  ABOUT = 'about',
  COURSES = 'courses',
  ADMISSION_INFO = 'admission_info',
  SUCCESS_STORIES = 'success_stories',
  FACULTY = 'faculty',
  TESTIMONIALS = 'testimonials',
  FAQ = 'faq',
  CONTACT = 'contact',
  FOOTER = 'footer',
  FEATURES = 'features',
  PRICING = 'pricing',
  CTA = 'cta',
  STATS = 'stats',
  GALLERY = 'gallery',
}

@Entity('site_sections')
export class SiteSectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column({ nullable: true })
  pageId: string;

  @ManyToOne(() => SitePageEntity, (page) => page.sections, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'pageId' })
  page: SitePageEntity;

  @Column({
    type: 'enum',
    enum: SectionType,
  })
  sectionType: SectionType;

  @Column({ type: 'int', default: 1 })
  designVariant: number;

  @Column({ type: 'int' })
  order: number;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ type: 'jsonb' })
  content: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
