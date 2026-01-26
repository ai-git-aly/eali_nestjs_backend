import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity.js';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MessagesService {
    private transporter: nodemailer.Transporter | null = null;

    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {
        this.initializeTransporter();
    }

    private initializeTransporter() {
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        if (emailUser && emailPass) {
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
            });
            console.log('Email transporter initialized with:', emailUser);
        } else {
            console.log('Email not configured. Set EMAIL_USER and EMAIL_PASS in .env file.');
            console.log('Messages will be saved to database but emails will not be sent.');
        }
    }

    async create(createMessageDto: any): Promise<Message> {
        // Save to database
        const message = new Message();
        message.name = createMessageDto.name;
        message.email = createMessageDto.email;
        message.subject = createMessageDto.subject;
        message.content = createMessageDto.content;
        const savedMessage = await this.messageRepository.save(message);
        console.log(`Message saved to database with ID: ${savedMessage.id}`);

        // Send email notification if configured
        if (this.transporter) {
            try {
                await this.sendEmailNotification(savedMessage);
            } catch (error) {
                console.error('Failed to send email notification:', error);
                // Don't throw - message is still saved even if email fails
            }
        }

        return savedMessage;
    }

    private async sendEmailNotification(message: Message) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'alyprograma@gmail.com',
            subject: `New Contact Message: ${message.subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #7c2d12; border-bottom: 2px solid #7c2d12; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; font-weight: bold; width: 100px;">From:</td>
                            <td style="padding: 10px;">${message.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold;">Email:</td>
                            <td style="padding: 10px;"><a href="mailto:${message.email}">${message.email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold;">Subject:</td>
                            <td style="padding: 10px;">${message.subject}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
                        <h3 style="margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap;">${message.content}</p>
                    </div>
                    <p style="margin-top: 20px; color: #666; font-size: 12px;">
                        Sent from EALI website contact form on ${new Date().toLocaleString()}
                    </p>
                </div>
            `,
        };

        await this.transporter!.sendMail(mailOptions);
        console.log(`Email notification sent for message ID: ${message.id}`);
    }

    async findAll(): Promise<Message[]> {
        return this.messageRepository.find({ order: { createdAt: 'DESC' } });
    }
}
