import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { joiSchema } from './config/joi.validation';
import { ClientsModule } from './clients/clients.module';
import { GarmentsModule } from './garments/garments.module';
import { NotesModule } from './notes/notes.module';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { CatchFilter } from './common/filter/catch.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joiSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: Number(process.env.PORT_BD),
      database: process.env.BD_NAME,
      username: process.env.USER_BD,
      password: process.env.PASSWORD_BD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule,
    GarmentsModule,
    NotesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CatchFilter,
    },
  ],
})
export class AppModule {}
