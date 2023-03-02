import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Garment } from '../garments/entities';
import { Client, ClientsController, ClientsService } from '../clients';
import { CommonModule, EGenericResponse, ResponseGenericInfoDto } from '../common';
import { DetailNote, Note } from './entities';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { GarmentsController } from '../garments/garments.controller';
import { GarmentsService } from '../garments/garments.service';
import { ConflictException } from '@nestjs/common/exceptions';

describe('Unit test Notes', () => {
  let notesController: NotesController;
  let notesService: NotesService;
  let clientsController: ClientsController;
  let clientsService: ClientsService;
  let garmentsController: GarmentsController;
  let garmentsService: GarmentsService;
  const data: any = {
    client: 1,
    amount: 12,
    total_garments: 2,
    client_pay: 22,
    change: 10,
    missing_pay: 0,
    details: [
      {
        id_g: 1,
        quantity_receive: 1,
        quantity_by_garments: 1,
        price: 12,
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NotesController, ClientsController, GarmentsController],
      providers: [NotesService, ClientsService, GarmentsService],
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
    clientsController = await moduleRef.resolve(ClientsController);
    garmentsController = await moduleRef.resolve(GarmentsController);
  });

  describe('Create notes and details', () => {
    it('Should return the new Id', async () => {
      await clientsController.create({
        name: 'Anahi',
        email: 'anahi@gmail.com',
        cellphone: '1234566786',
      });

      await garmentsController.create({
        code_garment: 2.3,
        description: 'Falda',
        number_garments: 2,
        price: 100.5,
      });
      const idNote: any = await notesController.create(data);

      expect(idNote.data).toEqual({ id: 1 });
    });

    it('Should return a correct struct', async () => {
      const result: any = new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.create,
        { id: 1 }
      );
      jest.spyOn(notesService, 'create').mockImplementation(() => result);

      expect(await notesController.create(data)).toStrictEqual(result);
    });
    it('Should return a conflict exception', async () => {
      const dataTest: any = {
        client: 100,
        amount: 12,
        total_garments: 2,
        client_pay: 22,
        change: 10,
        missing_pay: 0,
        details: [
          {
            id_g: 1,
            quantity_receive: 1,
            quantity_by_garments: 1,
            price: 12,
          },
        ],
      };
      const result: any = new ConflictException();
      jest.spyOn(notesService, 'create').mockImplementation(() => result);

      expect(await notesController.create(dataTest)).toStrictEqual(result);
    });
  });
});
