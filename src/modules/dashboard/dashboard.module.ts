import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from './dashboard.service.js';
import { News } from '../news/news.entity.js';
import { Tender } from '../tenders/tender.entity.js';
import { Partner } from '../partners/partner.entity.js';
import { Program } from '../programs/program.entity.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([News, Tender, Partner, Program]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }
