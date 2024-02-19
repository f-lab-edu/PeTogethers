import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 
        process.env.NODE_ENV === 'production'
          ? './src/config/env/.production.env'
        : process.env.NODE_ENV === 'stage'
        ? './src/config/env/.stage.env'
        : './src/config/env/.development.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'petogethers',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true'
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
