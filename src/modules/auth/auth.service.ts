import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async onModuleInit() {
        await this.createInitialAdmin();
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ username });
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, pass: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(pass, 10);
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
        });
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') { // Postgres unique violation code
                throw new UnauthorizedException('Username already exists');
            }
            throw error;
        }
    }

    // Helper to create initial admin if none exists
    async createInitialAdmin() {
        const count = await this.userRepository.count();
        if (count === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const admin = this.userRepository.create({
                username: 'admin',
                password: hashedPassword,
            });
            await this.userRepository.save(admin);
            console.log('Initial admin user created: admin / admin123');
        }
    }
}
