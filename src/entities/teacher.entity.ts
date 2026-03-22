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

@Entity('teachers')
export class TeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteId: string;

  @ManyToOne(() => SiteEntity, (site) => site.teachers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'siteId' })
  site: SiteEntity;

  @Column()
  name: string;

  @Column({ nullable: true })
  nameBn: string;

  @Column()
  designation: string;

  @Column({ nullable: true })
  designationBn: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  subjectBn: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', nullable: true })
  bioBn: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'jsonb', default: [] })
  qualifications: string[];

  @Column({ nullable: true })
  experience: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
