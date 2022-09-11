import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: Number(process.env.PORT_BD),
      username: process.env.USER_BD,
      password: process.env.PASSWORD_BD,
      database: process.env.BD,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
