import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { NewsService } from './news.service.js';
import { News } from './news.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Get()
    findAll(): Promise<News[]> {
        return this.newsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<News | null> {
        return this.newsService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    create(@Body() news: any, @UploadedFile() file: Express.Multer.File): Promise<News> {
        const newsData = { ...news };
        if (file) {
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
            newsData.imageUrl = `${baseUrl}/uploads/${file.filename}`;
        }
        return this.newsService.create(newsData);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    update(@Param('id') id: string, @Body() newsData: any, @UploadedFile() file: Express.Multer.File): Promise<News | null> {
        const updatedData = { ...newsData };
        if (file) {
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
            updatedData.imageUrl = `${baseUrl}/uploads/${file.filename}`;
        }
        return this.newsService.update(+id, updatedData);
    }

    /*@Put(':id')
    update(@Param('id') id: string, @Body() news: any): Promise<News | null> {
        return this.newsService.update(+id, news);
    }*/


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.newsService.remove(+id);
    }
}
