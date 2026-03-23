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
import { CourseEntity } from './course.entity.js';
import { TeacherEntity } from './teacher.entity.js';

export enum DayOfWeek {
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
}

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column({ nullable: true })
  courseId: string;

  @ManyToOne(() => CourseEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleBn: string;

  @Column({ type: 'enum', enum: DayOfWeek })
  dayOfWeek: DayOfWeek;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ nullable: true })
  teacherId: string;

  @ManyToOne(() => TeacherEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teacherId' })
  teacher: TeacherEntity;

  @Column({ nullable: true })
  room: string;

  @Column({ nullable: true })
  meetingLink: string;

  @Column({ nullable: true })
  batchName: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
