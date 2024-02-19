import { IsDateString, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto{
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    readonly nickname: string;

    @IsDateString()
    @IsNotEmpty()
    readonly birthday: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;
    
}