import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FAQService } from './faq.service.js';
import { FAQ } from './faq.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('faqs')
export class FAQController {
    constructor(private readonly faqService: FAQService) {}

    @Get()
    findAll(): Promise<FAQ[]> {
        return this.faqService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createFaqDto: any): Promise<FAQ> {
        return this.faqService.create(createFaqDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateFaqDto: any
    ): Promise<FAQ> {
        return this.faqService.update(+id, updateFaqDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.faqService.remove(+id);
    }
}
