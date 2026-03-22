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

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  name: string;
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
