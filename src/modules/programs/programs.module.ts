import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './program.entity.js';
import { ProgramsService } from './programs.service.js';
import { ProgramsController } from './programs.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Program])],
    providers: [ProgramsService],
    controllers: [ProgramsController],
    exports: [ProgramsService],
})
export class ProgramsModule { }
