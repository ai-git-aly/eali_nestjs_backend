import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tenders')
export class Tender {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title_en: string;

    @Column({ nullable: true })
    title_fr: string;

    @Column({ type: 'text', nullable: true })
    description_en: string;

    @Column({ type: 'text', nullable: true })
    description_fr: string;

    @Column({ nullable: true })
    deadline: string;

    @Column({ nullable: true })
    date_posted: string;

    @Column({ nullable: true })
    fileUrl: string;

    @CreateDateColumn()
    createdAt: Date;
}
