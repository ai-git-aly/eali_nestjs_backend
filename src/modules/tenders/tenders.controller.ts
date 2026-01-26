import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TendersService } from './tenders.service.js';
import { Tender } from './tender.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('tenders')
export class TendersController {
    constructor(private readonly tendersService: TendersService) { }

    @Get()
    findAll(): Promise<Tender[]> {
        return this.tendersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Tender | null> {
        return this.tendersService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    create(@Body() tender: any, @UploadedFile() file: Express.Multer.File): Promise<Tender> {
        const tenderData = { ...tender };
        if (file) {
            tenderData.fileUrl = `http://localhost:3000/uploads/${file.filename}`;
        }
        return this.tendersService.create(tenderData);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    update(@Param('id') id: string, @Body() tender: any, @UploadedFile() file: Express.Multer.File): Promise<Tender | null> {
        const tenderData = { ...tender };
        if (file) {
            tenderData.fileUrl = `http://localhost:3000/uploads/${file.filename}`;
        }
        return this.tendersService.update(+id, tenderData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.tendersService.remove(+id);
    }
}
