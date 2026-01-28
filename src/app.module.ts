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
import { DashboardModule } from './modules/dashboard/dashboard.module.js';
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
      // Support both DATABASE_URL (Neon/production) and individual vars (local)
      url: process.env.DATABASE_URL || undefined,
      host: process.env.DATABASE_URL ? undefined : (process.env.DB_HOST || 'localhost'),
      port: process.env.DATABASE_URL ? undefined : parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DATABASE_URL ? undefined : (process.env.DB_USERNAME || 'postgres'),
      password: process.env.DATABASE_URL ? undefined : (process.env.DB_PASSWORD || 'alfatiha'),
      database: process.env.DATABASE_URL ? undefined : (process.env.DB_NAME || 'eali_db'),
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      synchronize: true, // Auto-update schema to match entities (set to false in production)
    }),
    NewsModule,
    TendersModule,
    PartnersModule,
    ProgramsModule,
    AuthModule,
    MessagesModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
