import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQ } from './faq.entity.js';
import { FAQService } from './faq.service.js';
import { FAQController } from './faq.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([FAQ])],
    controllers: [FAQController],
    providers: [FAQService],
    exports: [FAQService],
})
export class FAQModule {}
