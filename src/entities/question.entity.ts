import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExamEntity } from './exam.entity.js';

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface QuestionOption {
  id: string;
  text: string;
  textBn?: string;
  image?: string;
}

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  examId: string;

  @ManyToOne(() => ExamEntity, (exam) => exam.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'examId' })
  exam: ExamEntity;

  @Column({ type: 'text' })
  questionText: string;

  @Column({ type: 'text', nullable: true })
  questionTextBn: string;

  @Column({ nullable: true })
  questionImage: string;

  @Column({ type: 'jsonb' })
  options: QuestionOption[];

  @Column()
  correctOptionId: string;

  @Column({ type: 'text', nullable: true })
  explanation: string;

  @Column({ type: 'text', nullable: true })
  explanationBn: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  chapter: string;

  @Column({
    type: 'enum',
    enum: QuestionDifficulty,
    default: QuestionDifficulty.MEDIUM,
  })
  difficulty: QuestionDifficulty;

  @Column({ type: 'int', default: 1 })
  marks: number;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;
}
