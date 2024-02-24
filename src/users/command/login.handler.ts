import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor (
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        private authService: AuthService,
    ) {}

    async execute(command: LoginCommand) {
        const { email, password } = command;

        const user = await this.usersRepository.findOne({
            where: {email}
        })

        if (!user) {
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            throw new UnauthorizedException('유효하지 않은 비밀번호입니다.');
        }

        return this.authService.login({
            name: user.name,
            email: user.email,
            nickname: user.nickname,
            address: user.address,
        });
    }
}