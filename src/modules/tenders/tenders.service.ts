import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tender } from './tender.entity.js';

@Injectable()
export class TendersService {
    constructor(
        @InjectRepository(Tender)
        private tenderRepository: Repository<Tender>,
    ) { }

    findAll(): Promise<Tender[]> {
        return this.tenderRepository.find({ order: { deadline: 'ASC' } });
    }

    findOne(id: number): Promise<Tender | null> {
        return this.tenderRepository.findOneBy({ id });
    }

    create(tender: Partial<Tender>): Promise<Tender> {
        const newTender = this.tenderRepository.create(tender);
        return this.tenderRepository.save(newTender);
    }

    async update(id: number, tender: Partial<Tender>): Promise<Tender | null> {
        await this.tenderRepository.update(id, tender);
        return this.tenderRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.tenderRepository.delete(id);
    }
}
