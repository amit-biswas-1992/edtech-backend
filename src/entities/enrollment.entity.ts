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

export enum EnrollmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  WAITLISTED = 'waitlisted',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PARTIAL = 'partial',
  PAID = 'paid',
}

@Entity('enrollments')
export class EnrollmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.enrollments, {
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
  studentName: string;

  @Column()
  studentPhone: string;

  @Column({ nullable: true })
  guardianPhone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  institution: string;

  @Column({ nullable: true })
  sscRoll: string;

  @Column({ nullable: true })
  hscRoll: string;

  @Column({ nullable: true })
  targetUniversity: string;

  @Column({ nullable: true })
  batchPreference: string;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.PENDING,
  })
  status: EnrollmentStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.UNPAID,
  })
  paymentStatus: PaymentStatus;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
