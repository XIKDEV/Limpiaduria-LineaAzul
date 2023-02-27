import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Garment } from '../garments/entities';
import { DetailNote, Note } from '../notes/entities';
import { CommonModule, EGenericResponse, ResponseGenericDto } from '../common';
import { ClientsService } from './clients.service';
import { Client } from './entities';

describe('ClientsService', () => {
  let clientService: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
      imports: [
        TypeOrmModule.forFeature([Client, Note, DetailNote, Garment]),
        CommonModule,
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
        }),
      ],
    }).compile();

    clientService = module.get<ClientsService>(ClientsService);
  });
  describe('Should be defined all services', () => {
    it('Should be defined the client service', () => {
      expect(clientService).toBeDefined();
    });
  });
});
