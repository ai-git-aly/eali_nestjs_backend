import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProgramsService } from './programs.service.js';
import { Program } from './program.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('programs')
export class ProgramsController {
    constructor(private readonly programsService: ProgramsService) { }

    @Get()
    findAll(@Query('type') type?: string): Promise<Program[]> {
        if (type) {
            return this.programsService.findByType(type);
        }
        return this.programsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Program | null> {
        return this.programsService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() program: Partial<Program>): Promise<Program> {
        return this.programsService.create(program);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() program: Partial<Program>): Promise<Program | null> {
        return this.programsService.update(+id, program);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.programsService.remove(+id);
    }
}
