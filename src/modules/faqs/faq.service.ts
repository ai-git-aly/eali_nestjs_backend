import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FAQ } from './faq.entity.js';

@Injectable()
export class FAQService {
    constructor(
        @InjectRepository(FAQ)
        private faqRepository: Repository<FAQ>,
    ) {}

    async findAll(): Promise<FAQ[]> {
        return this.faqRepository.find({ order: { order: 'ASC' } });
    }

    async create(createFaqDto: any): Promise<FAQ> {
        const faq = new FAQ();
        faq.question_en = createFaqDto.question_en;
        faq.question_fr = createFaqDto.question_fr;
        faq.answer_en = createFaqDto.answer_en;
        faq.answer_fr = createFaqDto.answer_fr;
        faq.order = createFaqDto.order || 1;
        return this.faqRepository.save(faq);
    }

    async update(id: number, updateFaqDto: any): Promise<FAQ> {
        const faq = await this.faqRepository.findOne({ where: { id } });
        if (!faq) {
            throw new NotFoundException('FAQ not found');
        }
        
        if (updateFaqDto.question_en) faq.question_en = updateFaqDto.question_en;
        if (updateFaqDto.question_fr) faq.question_fr = updateFaqDto.question_fr;
        if (updateFaqDto.answer_en) faq.answer_en = updateFaqDto.answer_en;
        if (updateFaqDto.answer_fr) faq.answer_fr = updateFaqDto.answer_fr;
        if (updateFaqDto.order !== undefined) faq.order = updateFaqDto.order;
        
        return this.faqRepository.save(faq);
    }

    async remove(id: number): Promise<void> {
        const result = await this.faqRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('FAQ not found');
        }
    }
}
