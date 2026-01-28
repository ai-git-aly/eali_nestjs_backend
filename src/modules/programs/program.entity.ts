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

    // Learn More feature fields
    @Column({ type: 'text', nullable: true })
    description_en: string;

    @Column({ type: 'text', nullable: true })
    description_fr: string;

    @Column({ nullable: true })
    duration: string; // e.g., "3 years", "2 years"

    @Column({ nullable: true })
    degree_en: string; // e.g., "Bachelor's Degree"

    @Column({ nullable: true })
    degree_fr: string; // e.g., "Licence"

    @Column({ type: 'text', nullable: true })
    admission_requirements_en: string;

    @Column({ type: 'text', nullable: true })
    admission_requirements_fr: string;

    @Column({ type: 'text', nullable: true })
    career_opportunities_en: string;

    @Column({ type: 'text', nullable: true })
    career_opportunities_fr: string;

    @Column({ nullable: true })
    image_url: string; // Banner image for the program
}
