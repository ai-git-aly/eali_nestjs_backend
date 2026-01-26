import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news.entity.js';
import { NewsService } from './news.service.js';
import { NewsController } from './news.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([News])],
    providers: [NewsService],
    controllers: [NewsController],
    exports: [NewsService],
})
export class NewsModule { }
