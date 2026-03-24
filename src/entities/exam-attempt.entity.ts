import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExamEntity } from './exam.entity.js';
import { UserEntity } from './user.entity.js';
import { SiteEntity } from './site.entity.js';

export enum AttemptStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  TIMED_OUT = 'timed_out',
}

export interface AttemptAnswer {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  timeTaken: number;
}

@Entity('exam_attempts')
export class ExamAttemptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  examId: string;

  @ManyToOne(() => ExamEntity, (exam) => exam.attempts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'examId' })
  exam: ExamEntity;

  @Column()
  studentId: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: UserEntity;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  startedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalScore: number;

  @Column({ type: 'int', default: 0 })
  totalCorrect: number;

  @Column({ type: 'int', default: 0 })
  totalWrong: number;

  @Column({ type: 'int', default: 0 })
  totalSkipped: number;

  @Column({ type: 'jsonb', default: [] })
  answers: AttemptAnswer[];

  @Column({
    type: 'enum',
    enum: AttemptStatus,
    default: AttemptStatus.IN_PROGRESS,
  })
  status: AttemptStatus;

  @CreateDateColumn()
  createdAt: Date;
}
