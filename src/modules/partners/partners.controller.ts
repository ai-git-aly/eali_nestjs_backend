import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PartnersService } from './partners.service.js';
import { Partner } from './partner.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) { }

    @Get()
    findAll(@Query('type') type?: string): Promise<Partner[]> {
        if (type) {
            return this.partnersService.findByType(type);
        }
        return this.partnersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Partner | null> {
        return this.partnersService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() partner: Partial<Partner>): Promise<Partner> {
        return this.partnersService.create(partner);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() partner: Partial<Partner>): Promise<Partner | null> {
        return this.partnersService.update(+id, partner);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.partnersService.remove(+id);
    }
}
