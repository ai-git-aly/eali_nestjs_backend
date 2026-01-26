import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './partner.entity.js';

@Injectable()
export class PartnersService {
    constructor(
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
    ) { }

    findAll(): Promise<Partner[]> {
        return this.partnerRepository.find();
    }

    findByType(type: string): Promise<Partner[]> {
        return this.partnerRepository.find({ where: { type } });
    }

    findOne(id: number): Promise<Partner | null> {
        return this.partnerRepository.findOneBy({ id });
    }

    create(partner: Partial<Partner>): Promise<Partner> {
        const newPartner = this.partnerRepository.create(partner);
        return this.partnerRepository.save(newPartner);
    }

    async update(id: number, partner: Partial<Partner>): Promise<Partner | null> {
        await this.partnerRepository.update(id, partner);
        return this.partnerRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.partnerRepository.delete(id);
    }
}
