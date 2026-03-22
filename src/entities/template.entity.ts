import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum TemplateCategory {
  ADMISSION = 'admission',
  LANDING = 'landing',
  COACHING = 'coaching',
  PREMIUM = 'premium',
}

export interface DefaultSectionConfig {
  sectionType: string;
  designVariant: number;
  order: number;
  defaultContent: Record<string, any>;
}

@Entity('templates')
export class TemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({
    type: 'enum',
    enum: TemplateCategory,
  })
  category: TemplateCategory;

  @Column({ type: 'jsonb' })
  defaultSections: DefaultSectionConfig[];

  @CreateDateColumn()
  createdAt: Date;
}
