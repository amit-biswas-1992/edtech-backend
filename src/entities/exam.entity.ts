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
import { SiteEntity } from './site.entity.js';
import { CourseEntity } from './course.entity.js';
import { QuestionEntity } from './question.entity.js';
import { ExamAttemptEntity } from './exam-attempt.entity.js';

export enum ExamType {
  LIVE = 'live',
  PRACTICE = 'practice',
}

@Entity('exams')
export class ExamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, { onDelete: 'CASCADE' })
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

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ExamType,
  })
  type: ExamType;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'int', default: 100 })
  totalMarks: number;

  @Column({ type: 'int', nullable: true })
  passMarks: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.25 })
  negativeMarking: number;

  @Column({ type: 'int', default: 50 })
  questionsPerExam: number;

  @Column({ default: true })
  shuffleQuestions: boolean;

  @Column({ default: true })
  showResult: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endTime: Date;

  @Column({ type: 'int', nullable: true })
  maxAttempts: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => QuestionEntity, (question) => question.exam, {
    cascade: true,
  })
  questions: QuestionEntity[];

  @OneToMany(() => ExamAttemptEntity, (attempt) => attempt.exam, {
    cascade: true,
  })
  attempts: ExamAttemptEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
