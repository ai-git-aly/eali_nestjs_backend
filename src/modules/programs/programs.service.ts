import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './program.entity.js';

@Injectable()
export class ProgramsService {
    constructor(
        @InjectRepository(Program)
        private programRepository: Repository<Program>,
    ) { }

    findAll(): Promise<Program[]> {
        return this.programRepository.find();
    }

    findByType(type: string): Promise<Program[]> {
        return this.programRepository.find({ where: { type } });
    }

    findOne(id: number): Promise<Program | null> {
        return this.programRepository.findOneBy({ id });
    }

    create(program: Partial<Program>): Promise<Program> {
        const newProgram = this.programRepository.create(program);
        return this.programRepository.save(newProgram);
    }

    async update(id: number, program: Partial<Program>): Promise<Program | null> {
        await this.programRepository.update(id, program);
        return this.programRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.programRepository.delete(id);
    }
}
