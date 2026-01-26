import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './partner.entity.js';
import { PartnersService } from './partners.service.js';
import { PartnersController } from './partners.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Partner])],
    providers: [PartnersService],
    controllers: [PartnersController],
    exports: [PartnersService],
})
export class PartnersModule { }
