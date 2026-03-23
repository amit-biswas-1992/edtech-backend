import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity.js';
import { TemplateEntity } from './template.entity.js';
import { SiteSectionEntity } from './site-section.entity.js';
import { TeacherEntity } from './teacher.entity.js';
import { CourseEntity } from './course.entity.js';
import { PromoEntity } from './promo.entity.js';
import { EnrollmentEntity } from './enrollment.entity.js';
import { ScheduleEntity } from './schedule.entity.js';
import { ResultEntity } from './result.entity.js';
import { NoticeEntity } from './notice.entity.js';

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  name: string;
}

export interface ChatConfig {
  whatsappNumber?: string;
  whatsappMessage?: string;
  messengerPageId?: string;
  showWhatsapp?: boolean;
  showMessenger?: boolean;
}

@Entity('sites')
export class SiteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.sites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true, nullable: true })
  subdomain: string;

  @Column()
  templateId: string;

  @ManyToOne(() => TemplateEntity, { eager: true })
  @JoinColumn({ name: 'templateId' })
  template: TemplateEntity;

  @Column({ type: 'jsonb', nullable: true })
  colorTheme: ColorTheme;

  @Column({ nullable: true })
  seoTitle: string;

  @Column({ type: 'text', nullable: true })
  seoDescription: string;

  @Column({ nullable: true })
  seoKeywords: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  favicon: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ type: 'jsonb', nullable: true, default: null })
  chatConfig: ChatConfig;

  @Column({ type: 'varchar', default: 'light' })
  themeMode: string;

  @Column({ type: 'varchar', default: 'bn' })
  language: string;

  @OneToMany(() => SiteSectionEntity, (section) => section.site, {
    cascade: true,
  })
  sections: SiteSectionEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.site, { cascade: true })
  teachers: TeacherEntity[];

  @OneToMany(() => CourseEntity, (course) => course.site, { cascade: true })
  courses: CourseEntity[];

  @OneToMany(() => PromoEntity, (promo) => promo.site, { cascade: true })
  promos: PromoEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.site, {
    cascade: true,
  })
  enrollments: EnrollmentEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.site, {
    cascade: true,
  })
  schedules: ScheduleEntity[];

  @OneToMany(() => ResultEntity, (result) => result.site, { cascade: true })
  results: ResultEntity[];

  @OneToMany(() => NoticeEntity, (notice) => notice.site, { cascade: true })
  notices: NoticeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
