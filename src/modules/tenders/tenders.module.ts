import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tender } from './tender.entity.js';
import { TendersService } from './tenders.service.js';
import { TendersController } from './tenders.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Tender])],
    providers: [TendersService],
    controllers: [TendersController],
    exports: [TendersService],
})
export class TendersModule { }
