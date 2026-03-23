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

@Entity('results')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column()
  studentName: string;

  @Column({ nullable: true })
  studentNameBn: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  university: string;

  @Column({ nullable: true })
  universityBn: string;

  @Column({ nullable: true })
  department: string;

  @Column({ type: 'int' })
  admissionYear: number;

  @Column({ type: 'int', nullable: true })
  meritPosition: number;

  @Column({ nullable: true })
  coachingBatch: string;

  @Column({ nullable: true })
  previousInstitution: string;

  @Column({ type: 'text', nullable: true })
  testimonial: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
