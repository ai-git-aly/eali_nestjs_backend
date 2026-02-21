import { Controller, Get, Post, Body, Param, UseGuards, Patch } from '@nestjs/common';
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

    @UseGuards(JwtAuthGuard)
    @Patch(':id/reply')
    async reply(
        @Param('id') id: string,
        @Body() body: { reply_content: string }
    ): Promise<Message> {
        return this.messagesService.reply(+id, body.reply_content);
    }
}
