import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('faqs')
export class FAQ {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question_en: string;

    @Column()
    question_fr: string;

    @Column('text')
    answer_en: string;

    @Column('text')
    answer_fr: string;

    @Column({ default: 1 })
    order: number;
}
