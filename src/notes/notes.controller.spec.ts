import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Garment } from '../garments/entities';
import { Client } from '../clients';
import { CommonModule } from '../common';
import { DetailNote, Note } from './entities';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

describe('Unit test Notes', () => {
  let notesController: NotesController;
  let notesService: NotesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
      imports: [
        ConfigModule.forRoot({ envFilePath: ['.env', '.env.prod'], isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.HOST_BD_TEST,
          port: Number(process.env.PORT_BD_TEST),
          database: process.env.BD_NAME_TEST,
          username: process.env.USER_BD_TEST,
          password: process.env.PASSWORD_BD_TEST,
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Client, Note, DetailNote, Garment]),
        CommonModule,
      ],
    }).compile();

    notesController = await moduleRef.resolve(NotesController);
    notesService = await moduleRef.resolve(NotesService);
  });
});
