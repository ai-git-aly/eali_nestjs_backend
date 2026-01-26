import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('api_newsevent')
export class News {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', nullable: true })
    title_en: string;

    @Column({ type: 'varchar', nullable: true })
    title_fr: string;

    @Column({ type: 'text', nullable: true })
    description_en: string;

    @Column({ type: 'text', nullable: true })
    description_fr: string;

    @Column({ type: 'date', nullable: true })
    date: Date;

    @Column({ type: 'varchar', nullable: true })
    category: string;

    @Column({ type: 'varchar', nullable: true })
    imageUrl: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
