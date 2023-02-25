import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CommonModule,
  EGenericResponse,
  ResponseGenericDto,
  ResponseGenericInfoDto,
} from '../common';
import { ClientsController, ClientsService, Client, ClientListDto } from '.';
import { DetailNote, Note } from '../notes/entities';
import { Garment } from '../garments/entities';

describe('ClientsController', () => {
  let clientsController: ClientsController;
  let clientsService: ClientsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService],
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

    clientsController = await moduleRef.resolve(ClientsController);
    clientsService = await moduleRef.resolve(ClientsService);
  });

  describe('Get client', () => {
    const data = [
      {
        id: 1,
        name: 'Anahi',
        email: 'anahi@gmail.com',
        cellphone: '1234566786',
        notes: [],
      },
    ];

    it('Should return a generic response', async () => {
      const result: any = new ResponseGenericDto<ClientListDto>(
        ClientListDto
      ).createResponse(true, EGenericResponse.found, data);
      jest.spyOn(clientsService, 'findAll').mockImplementation(() => result);
      const expectResult = await clientsController.findAll();

      expect(expectResult).toStrictEqual(result);
    });
    it('Should return a generic response - findOne', async () => {
      const result: any = new ResponseGenericDto<ClientListDto>(
        ClientListDto
      ).createResponse(true, EGenericResponse.found, data);
      jest.spyOn(clientsService, 'findOne').mockImplementation(() => result);
      const expectResult = await clientsController.findOne(1);

      expect(expectResult).toStrictEqual(result);
    });

    it('Should return a client list', async () => {
      const result: any = new ResponseGenericDto<ClientListDto>(
        ClientListDto
      ).createResponse(true, EGenericResponse.found, data);
      jest.spyOn(clientsService, 'findAll').mockImplementation(() => result);
      const clientList = await clientsController.findAll();
      expect(clientList.data).toStrictEqual(data);
    });
  });

  describe('Create client', () => {
    it('Should create a new client', async () => {
      const clientList: any = await clientsController.create({
        name: 'Adilene',
        email: 'adi@gmail.com',
        cellphone: '12341234',
      });
      expect(clientList.data).toEqual({ id: 1 });
    });

    it('Should return generic response with mockImplementation', async () => {
      const result: any = new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.create,
        { id: 1 }
      );
      jest.spyOn(clientsService, 'create').mockImplementation(() => result);
      const clientList: any = await clientsController.create({
        name: 'Adilene',
        email: 'adi@gmail.com',
        cellphone: '12341234',
      });
      expect(clientList).toEqual(result);
    });
  });

  describe('Update client', () => {
    const data = {
      name: 'Adilene Zarate',
      email: 'adi@gmail.com',
      cellphone: '12341234',
    };
    it('Should return generic response with mockImplementation', async () => {
      const result: any = new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.create,
        data
      );
      jest.spyOn(clientsService, 'update').mockImplementation(() => result);
      const clientList: any = await clientsController.update(1, data);
      expect(clientList).toEqual(result);
    });
  });
});
