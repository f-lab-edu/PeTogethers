import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>
    ) {}

    async execute(command: CreateUserCommand) {
        const { email, password, name, nickname, birthday, address} = command;

        const userExist = await this.checkUserExists(email);

        if (userExist) {
            throw new UnprocessableEntityException('이미 존재하는 이메일입니다.');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const birthdayDate = new Date(birthday);

        await this.saveUser(email, hashedPassword, name, nickname, birthdayDate, address);
    }

    private async checkUserExists(email: string): Promise<boolean> {
        const user = await this.usersRepository.findOne({
            where: {
                email
            }
        })

        return user !== null;
    }

    private async saveUser(email: string, hashedPassword: string, name: string, nickname: string, birthday: Date, address: string) {
        const user = new UserEntity();

        user.email = email;
        user.password = hashedPassword;
        user.name = name;
        user.nickname = nickname;
        user.birthday = birthday;
        user.address = address;

        await this.usersRepository.save(user)

    }
}