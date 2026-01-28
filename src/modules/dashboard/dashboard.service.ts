import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../news/news.entity.js';
import { Tender } from '../tenders/tender.entity.js';
import { Partner } from '../partners/partner.entity.js';
import { Program } from '../programs/program.entity.js';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
        @InjectRepository(Tender)
        private tenderRepository: Repository<Tender>,
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
        @InjectRepository(Program)
        private programRepository: Repository<Program>,
    ) { }

    async getStats() {
        const [newsCount, tendersCount, partnersCount, programsCount] = await Promise.all([
            this.newsRepository.count(),
            this.tenderRepository.count(),
            this.partnerRepository.count(),
            this.programRepository.count(),
        ]);

        return {
            news: newsCount,
            tenders: tendersCount,
            partners: partnersCount,
            programs: programsCount,
        };
    }
}
