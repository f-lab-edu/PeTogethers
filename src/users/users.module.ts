import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './command/create-user.handler';
import { LoginHandler } from './command/login.handler';
import { AuthModule } from 'src/auth/auth.module';

const commandHandlers = [
  CreateUserHandler,
  LoginHandler
]

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [
    ...commandHandlers,
  ]
})
export class UsersModule {}