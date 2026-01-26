import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { NewsModule } from './modules/news/news.module.js';
import { TendersModule } from './modules/tenders/tenders.module.js';
import { PartnersModule } from './modules/partners/partners.module.js';
import { ProgramsModule } from './modules/programs/programs.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { MessagesModule } from './modules/messages/messages.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized : false,
      },
      autoLoadEntities: true,
      synchronize: false, // Auto-update schema to match entities (set to false in production)
    }),
    NewsModule,
    TendersModule,
    PartnersModule,
    ProgramsModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

