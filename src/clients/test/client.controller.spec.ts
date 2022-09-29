import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { ResponseGenericDto } from '../../common/response/reponse-generic.dto';
import { ClientsController } from '../clients.controller';
import { ClientsService } from '../clients.service';
import { ClientListDto } from '../dto/client-list.dto';
import { Client } from '../entities/client.entity';

describe('ClientController', () => {
  let clientController: ClientsController;
  let clientService: ClientsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        ClientsService,
        { provide: getRepositoryToken(Client), useValue: jest.fn() },
      ],
      imports: [CommonModule],
      // imports: [TypeOrmModule.forFeature([Client]), CommonModule],
    }).compile();

    clientService = moduleRef.get<ClientsService>(ClientsService);
    clientController = moduleRef.get<ClientsController>(ClientsController);
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const result = [
        {
          id: 3,
          name: 'Adilene',
          email: 'Adilene@gmail.com',
          cellphone: '515345124',
          notes: [
            {
              id: 1,
              amount: '1',
              total_garments: 12,
              client_pay: '100',
              change: '50',
              missing_pay: '150',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
          ],
        },
        {
          id: 4,
          name: 'Adilene',
          email: 'Adilene@gmail.com',
          cellphone: '515345124',
          notes: [
            {
              id: 2,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: true,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 3,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 4,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
          ],
        },
        {
          id: 5,
          name: 'Adilene',
          email: 'Adilene@gmail.com',
          cellphone: '515345124',
          notes: [
            {
              id: 9,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 13,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 14,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 19,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 20,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 15,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 5,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 6,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
            {
              id: 7,
              amount: '11',
              total_garments: 2,
              client_pay: '100',
              change: '0',
              missing_pay: '0',
              status: false,
              createdAt: '2022-09-28',
              updatedAt: '2022-09-28',
            },
          ],
        },
        {
          id: 6,
          name: 'Adilene',
          email: 'Adilene@gmail.com',
          cellphone: '515345124',
          notes: [],
        },
        {
          id: 9,
          name: 'Adilene',
          email: 'Adilene@gmail.com',
          cellphone: null,
          notes: [],
        },
        {
          id: 11,
          name: null,
          email: 'Adilene@gmail.com',
          cellphone: '515345124',
          notes: [],
        },
        {
          id: 12,
          name: 'Adilene',
          email: 'Adilene@gmail.com',
          cellphone: null,
          notes: [],
        },
        {
          id: 13,
          name: 'Adilene',
          email: null,
          cellphone: null,
          notes: [],
        },
        {
          id: 14,
          name: 'Adilene',
          email: null,
          cellphone: null,
          notes: [],
        },
        {
          id: 15,
          name: 'Adilene',
          email: null,
          cellphone: '515345124',
          notes: [],
        },
      ];

      jest
        .spyOn(clientService, 'findAll')
        .mockImplementation(async () =>
          new ResponseGenericDto<ClientListDto>(ClientListDto).createResponse(
            true,
            'Information found',
            result,
          ),
        );

      expect(await clientController.findAll()).toBe({
        success: true,
        data: [
          {
            id: 3,
            name: 'Adilene',
            email: 'Adilene@gmail.com',
            cellphone: '515345124',
            notes: [
              {
                id: 1,
                amount: '1',
                total_garments: 12,
                client_pay: '100',
                change: '50',
                missing_pay: '150',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
            ],
          },
          {
            id: 4,
            name: 'Adilene',
            email: 'Adilene@gmail.com',
            cellphone: '515345124',
            notes: [
              {
                id: 2,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: true,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 3,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 4,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
            ],
          },
          {
            id: 5,
            name: 'Adilene',
            email: 'Adilene@gmail.com',
            cellphone: '515345124',
            notes: [
              {
                id: 9,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 13,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 14,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 19,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 20,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 15,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 5,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 6,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
              {
                id: 7,
                amount: '11',
                total_garments: 2,
                client_pay: '100',
                change: '0',
                missing_pay: '0',
                status: false,
                createdAt: '2022-09-28',
                updatedAt: '2022-09-28',
              },
            ],
          },
          {
            id: 6,
            name: 'Adilene',
            email: 'Adilene@gmail.com',
            cellphone: '515345124',
            notes: [],
          },
          {
            id: 9,
            name: 'Adilene',
            email: 'Adilene@gmail.com',
            cellphone: null,
            notes: [],
          },
          {
            id: 11,
            name: null,
            email: 'Adilene@gmail.com',
            cellphone: '515345124',
            notes: [],
          },
          {
            id: 12,
            name: 'Adilene',
            email: 'Adilene@gmail.com',
            cellphone: null,
            notes: [],
          },
          {
            id: 13,
            name: 'Adilene',
            email: null,
            cellphone: null,
            notes: [],
          },
          {
            id: 14,
            name: 'Adilene',
            email: null,
            cellphone: null,
            notes: [],
          },
          {
            id: 15,
            name: 'Adilene',
            email: null,
            cellphone: '515345124',
            notes: [],
          },
        ],
        message: 'Information found',
      });
    });
  });
});
