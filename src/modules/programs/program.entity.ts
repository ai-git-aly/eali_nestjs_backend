import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('programs')
export class Program {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name_en: string;

    @Column({ nullable: true })
    name_fr: string;

    @Column({ nullable: true })
    type: string; // 'faculty' or 'professional_course'

    @Column('simple-array', { nullable: true })
    options_en: string[];

    @Column('simple-array', { nullable: true })
    options_fr: string[];

    @Column({ nullable: true })
    icon: string; // Icon name from lucide-react
}
