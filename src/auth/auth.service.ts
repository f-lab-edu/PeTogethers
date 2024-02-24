import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/authConfig';
import * as jwt from 'jsonwebtoken';

interface User {
    name: string;
    email: string;
    nickname: string;
    address: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ) {}

    login(user: User) {
        const payload = {...user}

        return jwt.sign(payload, this.config.jwtSecret, {
            expiresIn: '1d',
            audience: 'leekc.com',
            issuer: 'leekc.com',
        });
    }

    verify(jwtString: string) {
        try {
            const payload = jwt.verify(jwtString, this.config.jwtSecret) as (jwt.JwtPayload | string) & User;

            const {name, email, nickname, address} = payload;

            return {
                name,
                email,
                nickname,
                address
            }
            
        }catch (e) {
            throw new UnauthorizedException()
        }
    }
}
