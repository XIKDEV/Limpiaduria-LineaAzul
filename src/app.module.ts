import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { joiSchema } from './config/joi.validation';
import { ClientsModule } from './clients/clients.module';
import { GarmentsModule } from './garments/garments.module';
import { NotesModule } from './notes/notes.module';
import { CatchFilter } from './common/filter/catch.filter';
import { Client } from './clients';
import { Garment } from './garments/entities';
import { DetailNote, Note } from './notes/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joiSchema,
      envFilePath: ['.env', '.env.prod'],
    }),
    TypeOrmModule.forRoot({
      // ssl: true,
      // extra: {
      //   ssl: { rejectUnauthorized: false },
      // },
      type: 'postgres',
      host: process.env.HOST_BD,
      port: Number(process.env.PORT_BD),
      database: process.env.BD_NAME,
      username: process.env.USER_BD,
      password: process.env.PASSWORD_BD,
      entities: [Client, Garment, DetailNote, Note],
      synchronize: false,
    }),
    ClientsModule,
    GarmentsModule,
    NotesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchFilter,
    },
  ],
})
export class AppModule {}
