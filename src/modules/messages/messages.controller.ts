import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { Message } from './message.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post()
    create(@Body() createMessageDto: any): Promise<Message> {
        return this.messagesService.create(createMessageDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Message[]> {
        return this.messagesService.findAll();
    }
}
