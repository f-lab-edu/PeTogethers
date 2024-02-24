import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor (private userService : UsersService) {}

    // /users 회원가입
    @Post()
    @HttpCode(201)
    async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<{ status: number, message: string}> {

        await this.userService.createUser(dto)

        return { status: 201, message: '회원가입에 성공하였습니다.'}
    }

}