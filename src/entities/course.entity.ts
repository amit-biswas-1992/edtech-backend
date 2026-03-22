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
import { TeacherEntity } from './teacher.entity.js';

export enum CourseCategory {
  ENGINEERING = 'engineering',
  MEDICAL = 'medical',
  UNIVERSITY = 'university',
  HSC = 'hsc',
  SSC = 'ssc',
}

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.courses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleBn: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  descriptionBn: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fee: number;

  @Column({ default: 'BDT' })
  feeCurrency: string;

  @Column({
    type: 'enum',
    enum: CourseCategory,
  })
  category: CourseCategory;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ type: 'jsonb', default: [] })
  syllabus: { topic: string; description: string }[];

  @Column({ type: 'int', nullable: true })
  totalSeats: number;

  @Column({ type: 'int', default: 0 })
  enrolledCount: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  schedule: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  teacherId: string;

  @ManyToOne(() => TeacherEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teacherId' })
  teacher: TeacherEntity;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
