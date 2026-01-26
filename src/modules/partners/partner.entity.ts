import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('api_partner')
export class Partner {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', nullable: true })
    name_en: string;

    @Column({ type: 'varchar', nullable: true })
    name_fr: string;

    @Column({ type: 'varchar', nullable: true })
    country_en: string;

    @Column({ type: 'varchar', nullable: true })
    country_fr: string;

    @Column({ type: 'varchar', nullable: true })
    type: string;

    @Column({ type: 'varchar', nullable: true })
    logo: string;
}
