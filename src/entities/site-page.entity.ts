import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { SiteEntity } from './site.entity.js';
import { SiteSectionEntity } from './site-section.entity.js';

export enum PageType {
  LANDING = 'landing',
  COURSE_DETAILS = 'course_details',
  ENROLLED_COURSES = 'enrolled_courses',
  LOGIN = 'login',
  SIGNUP = 'signup',
  CHECKOUT = 'checkout',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAIL = 'payment_fail',
  EXAM_DETAILS = 'exam_details',
  EXAM_LIVE = 'exam_live',
  EXAM_PRACTICE = 'exam_practice',
  EXAM_RESULT = 'exam_result',
  EXAM_LEADERBOARD = 'exam_leaderboard',
  CUSTOM = 'custom',
}

export enum BuilderType {
  SECTIONS = 'sections',
  TEMPLATE = 'template',
}

@Entity('site_pages')
@Unique(['siteId', 'slug'])
export class SitePageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleBn: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: PageType,
  })
  pageType: PageType;

  @Column({
    type: 'enum',
    enum: BuilderType,
  })
  builderType: BuilderType;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ default: false })
  isHomepage: boolean;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, any>;

  @OneToMany(() => SiteSectionEntity, (section) => section.page, {
    cascade: true,
  })
  sections: SiteSectionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
