import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/create-user.command';
import { UserLoginDto } from './dto/user-login.dto';
import { LoginCommand } from './command/login.command';

@Controller('users')
export class UsersController {
    constructor (private commandBus: CommandBus) {}

    // /users 회원가입
    @Post()
    @HttpCode(201)
    async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<{ status: number, message: string}> {

        const { email, password, name, nickname, birthday, address} = dto;

        const command = new CreateUserCommand(email, password, name, nickname, birthday, address);

        return this.commandBus.execute(command);
    }

    // /users/login 로그인
    @Post('/login/')
    @HttpCode(201)
    async login(@Body() dto: UserLoginDto): Promise<string> {
        const {email, password} = dto;

        const command = new LoginCommand(email, password)

        return this.commandBus.execute(command);
        
    }

}