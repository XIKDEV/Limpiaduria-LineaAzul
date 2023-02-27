import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetailNote, Note } from '../notes/entities';
import { Client } from '../clients';
import {
  CommonModule,
  EGenericResponse,
  ResponseGenericDto,
  ResponseGenericInfoDto,
} from '../common';
import { Garment } from './entities';
import { GarmentsController } from './garments.controller';
import { GarmentsService } from './garments.service';
import { ConflictException } from '@nestjs/common';

describe('Unit test to garments module', () => {
  let garmentsController: GarmentsController;
  let garmentsService: GarmentsService;

  const dataList = [
    {
      id: 1,
      code_garment: 1.2,
      description: 'Falda',
      number_garments: 2,
      price: 100.5,
    },
  ];
  const dataUpdate = {
    id: 1,
    code_garment: 2.3,
    description: 'Falda',
    number_garments: 2,
    price: 100.5,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GarmentsController],
      providers: [GarmentsService],
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

    garmentsController = await moduleRef.resolve(GarmentsController);
    garmentsService = await moduleRef.resolve(GarmentsService);
  });
  describe('Create garment', () => {
    const { id, ...restData } = dataList[0];
    it('Create new register', async () => {
      const newGarment: any = await garmentsController.create(restData);
      expect(newGarment.data).toStrictEqual({ id });
    });

    it('Response struct response', async () => {
      const result: any = new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.create,
        { id }
      );
      jest.spyOn(garmentsService, 'create').mockImplementation(() => result);
      expect(await garmentsController.create(restData)).toMatchObject(result);
    });
  });

  describe('Get garments', () => {
    it('Should be return a garment list', async () => {
      const result: any = new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        dataList
      );
      jest.spyOn(garmentsService, 'findAll').mockImplementation(() => result);
      expect(await garmentsController.findAll()).toStrictEqual(result);
    });
  });

  describe('Update garments', () => {
    const { id, ...restData } = dataUpdate;
    it('Update garment', async () => {
      const newData: any = await garmentsController.update(id, restData);
      expect(newData.data).toStrictEqual(dataUpdate);
    });

    it('Response generic response into update', async () => {
      const result: any = new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.update,
        dataUpdate
      );

      jest.spyOn(garmentsService, 'update').mockImplementation(() => result);
      expect(await garmentsController.update(id, restData)).toStrictEqual(result);
    });
    it('Response conflictException', async () => {
      const result: any = new ConflictException();

      jest.spyOn(garmentsService, 'update').mockImplementation(() => result);
      expect(await garmentsController.update(3, restData)).toStrictEqual(result);
    });
  });
  describe('Delete garments', () => {
    it('Delete garment', async () => {
      const newData: any = await garmentsController.remove(dataUpdate.id);
      expect(newData.data).toStrictEqual({ id: dataUpdate.id });
    });

    it('Response generic response into delete', async () => {
      const result: any = new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.delete,
        { id: dataUpdate.id }
      );

      jest.spyOn(garmentsService, 'remove').mockImplementation(() => result);
      expect(await garmentsController.remove(dataUpdate.id)).toStrictEqual(result);
    });
    it('Response conflictException', async () => {
      const result: any = new ConflictException();

      jest.spyOn(garmentsService, 'remove').mockImplementation(() => result);
      expect(await garmentsController.remove(3)).toStrictEqual(result);
    });
  });
});
