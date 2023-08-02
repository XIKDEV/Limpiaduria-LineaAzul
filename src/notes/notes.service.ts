import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as dayjs from 'dayjs';
import { Like, Repository } from 'typeorm';

import { Garment } from '../garments/entities';
import { Client } from '../clients/entities';
import {
  ResponseGenericInfoDto,
  ErrorCatchService,
  ResponseGenericDto,
  EGenericResponse,
  EExceptionsOptions,
  pagination,
} from '../common';
import { CreateNoteDto } from './dto';
import { Note, DetailNote } from './entities';
import { queryParamsDto } from '../clients';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(DetailNote)
    private readonly detailNoteRepository: Repository<DetailNote>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Garment)
    private readonly garmentRepository: Repository<Garment>,
    private readonly errorCatch: ErrorCatchService
  ) {}

  /**
   * I want to create a note with details, but I want to create the details first and then create the
   * note with the details.
   * </code>
   * @param {CreateNoteDto} createNoteDto - CreateNoteDto
   * @returns {
   *   "success": true,
   *   "message": "create",
   *   "data": {
   *     "id": 1
   *   }
   * }
   */
  async create(createNoteDto: CreateNoteDto) {
    try {
      const { details = [], client, ...createDetail } = createNoteDto;

      const idClient = await this.clientRepository.findOne({
        where: {
          id: client,
        },
        select: {
          id: true,
        },
      });

      if (!idClient) throw new Error(EExceptionsOptions.notFoundClient);
      const data = this.noteRepository.create({
        ...createDetail,
        client: idClient,
        details: details.map(
          ({ id_g, price, quantity_receive, quantity_by_garments }) =>
            this.detailNoteRepository.create({
              id_g: id_g,
              quantity_receive,
              quantity_by_garments,
              price: price,
            })
        ),
      });

      const { id } = await this.noteRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.create,
        { id }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It returns the last id in the database + 1.
   * @returns The response is a JSON object with the following structure:
   * {
   *   "success": true,
   *   "message": "newFolio",
   *   "data": {
   *     "id": 1
   *   }
   * }
   */
  async newFolio() {
    try {
      const data = await this.noteRepository.find({
        order: {
          id: 'ASC',
        },
        select: { id: true },
      });
      const newFolio = !data.length ? 1 : data.pop().id + 1;
      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.newFolio,
        {
          id: newFolio,
        }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * I'm trying to get all the notes that are not canceled or finished, and I want to get the details
   * of each note, and the client of each note.
   * </code>
   * @returns [
   *   {
   *     "id": 1,
   *     "created": "2020-04-20T18:00:00.000Z",
   *     "amount": 0,
   *     "missing_pay": 0,
   *     "client": {
   *       "id": 1,
   *       "name": "Juan",
   *       "lastname": "P
   */
  async findAll({ page, rows, search }: queryParamsDto) {
    try {
      const { skip, take } = pagination({ page, rows });
      const data = await this.noteRepository.findAndCount({
        relations: {
          details: true,
          client: true,
        },
        where: search
          ? [
              {
                folio: Like(`%${search}%`),
                cancel: false,
                status: false,
              },
              {
                client: { name: Like(`%${search}%`) },
                cancel: false,
                status: false,
              },
            ]
          : {
              cancel: false,
              status: false,
            },
        skip,
        take,
      });
      const pageSelect = skip / 10;

      return new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        data[0].map((note) => {
          const {
            client,
            amount,
            missing_pay,
            id,
            folio,
            createdAt: created,
          } = note;
          const { email, cellphone, ...clientInfo } = client;

          return {
            id,
            folio,
            created,
            amount,
            missing_pay,
            client: clientInfo,
            details: note.details.map((detail) => {
              const { id_n, id_g, price: priceInDetail, ...detailRest } = detail;
              const {
                createdAt,
                updatedAt,
                price,
                status,
                id,
                code_garment,
                ...garmentInfo
              } = id_g;

              return {
                ...detailRest,
                garment: garmentInfo,
              };
            }),
          };
        }),
        {
          count: data[1],
          page: pageSelect + 1,
          rows: take,
        }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It returns a list of notes, each note has a client and a list of details, each detail has a
   * garment.
   * </code>
   * @returns [
   *   {
   *     "id": 1,
   *     "created": "2020-04-20T00:00:00.000Z",
   *     "statusNote": "PENDING",
   *     "amount": 0,
   *     "missing_pay": 0,
   *     "client": {
   *       "id": 1,
   *       "name": "
   */
  async findAllSearchService({ page, rows, search }: queryParamsDto) {
    try {
      const { skip, take } = pagination({ page, rows });
      const data = await this.noteRepository.findAndCount({
        relations: {
          details: true,
          client: true,
        },
        where: search
          ? [
              {
                folio: Like(`%${search}%`),
                cancel: false,
              },
              {
                client: { name: Like(`%${search}%`) },
                cancel: false,
              },
            ]
          : {
              cancel: false,
            },
        skip,
        take,
      });

      const mappedNotes = data[0].map((note) => ({
        id: note.id,
        folio: note.folio,
        created: note.createdAt,
        statusNote: note.status,
        amount: note.amount,
        missing_pay: note.missing_pay,
        client: { ...note.client, email: null, cellphone: null },
        details: note.details.map(({ id_g, price, quantity_receive }) => ({
          quantity_receive,
          garment: { ...id_g, price },
        })),
      }));

      const pageSelect = skip / 10;

      return new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        mappedNotes,
        {
          count: data[1],
          page: pageSelect + 1,
          rows: take,
        }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * I'm trying to get the data from the note table, and the data from the client table, and the data
   * from the detail table, and the data from the garment table.
   * </code>
   * @param {number} id - number
   * @returns {
   *   "success": true,
   *   "message": "found",
   *   "data": {
   *     "id": 1,
   *     "client": {
   *       "id": 1,
   *       "name": "Juan",
   *       "lastname": "Perez",
   *       "phone": "123456789",
   *       "email":
   */
  async findOne(id: number) {
    try {
      const { client, ...data } = await this.noteRepository.findOne({
        where: { id, cancel: false },
        relations: {
          details: true,
        },
      });

      if (!data) throw new Error(EExceptionsOptions.notFoundNote);

      const { status, createdAt, updatedAt, ...clientInfo } = client;

      const noteFind = {
        ...data,
        client: clientInfo,
        details: data.details.map((detail) => {
          const { id_n, id_g, ...detailRest } = detail;
          const { createdAt, updatedAt, price, status, ...garmentInfo } = id_g;

          return {
            ...detailRest,
            garment: garmentInfo,
          };
        }),
      };

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.found,
        noteFind
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It updates the note in the database and returns a response with the id of the note.
   * @param {number} id - number
   * @returns A ResponseGenericInfoDto object.
   */
  async deliverNote(id: number) {
    try {
      const data = await this.noteRepository.update(id, {
        missing_pay: 0,
        status: true,
        updatedAt: dayjs().format('YYYY-MM-DD'),
      });

      if (!data) throw new Error(EExceptionsOptions.notFoundNote);

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.noteDelivery,
        { id }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It updates the note and the detail note, and returns a response.
   * @param {any} id - any
   * @returns The return is a ResponseGenericInfoDto object.
   */
  async remove(id: any) {
    try {
      const data = await this.noteRepository.preload({
        id,
        cancel: true,
        updatedAt: dayjs().format('YYYY-MM-DD'),
      });

      if (!data) throw new Error(EExceptionsOptions.notFoundNote);

      await this.detailNoteRepository.update(
        {
          id_n: id,
        },
        {
          active: false,
          updatedAt: dayjs().format('YYYY-MM-DD'),
        }
      );

      await this.noteRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.noteCancel,
        { id }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It returns a response with the total of notes that have the status true and the updatedAt date
   * equal to the date passed as a parameter.
   * @param {string} date - string
   * @returns A ResponseGenericInfoDto object.
   */
  async garmentsDelivery(date: string) {
    try {
      const data = await this.noteRepository.count({
        where: {
          status: true,
          updatedAt: date,
        },
      });

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.countFinish,
        { total: data }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It returns a response with a count of the number of notes created on a given date.
   * @param {string} date - string
   * @returns A ResponseGenericInfoDto object.
   */
  async garmentsReceived(date: string) {
    try {
      const data = await this.noteRepository.count({
        where: {
          createdAt: date,
        },
      });

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.countFinish,
        { total: data }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It returns the sum of the total_garments field of all the notes that have the updatedAt field
   * equal to the date parameter and the status field equal to true.
   * </code>
   * @param {string} date - string =&gt; the date that I want to search for
   * @returns The response is a JSON object with the following structure:
   * {
   *   "success": true,
   *   "message": "found",
   *   "data": {
   *     "total": 0
   *   }
   * }
   */
  async totalGarmentsDelivery(date: string) {
    try {
      const data = await this.noteRepository
        .createQueryBuilder('note')
        .select('SUM(note.total_garments)')
        .where('note.updatedAt =:date and note.status =:status', {
          date: date,
          status: true,
        })
        .getRawOne();

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.found,
        { total: Number(data.sum) }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It returns the sum of the total_garments field of all the notes created on the date passed as a
   * parameter.
   * @param {string} date - string
   * @returns The total of garments received in a specific date.
   */
  async totalGarmentsReceived(date: string) {
    try {
      const data = await this.noteRepository
        .createQueryBuilder('note')
        .select('SUM(note.total_garments)')
        .where('note.createdAt =:date', {
          date: date,
        })
        .getRawOne();

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.found,
        { total: Number(data.sum) }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It returns the sum of the quantity of garments received by date.
   * </code>
   * @param {string} date - string
   * @returns [
   *   {
   *     "garmentDescription": "PANTALON",
   *     "quantityGarments": 1,
   *     "id": 1
   *   },
   *   {
   *     "garmentDescription": "CAMISA",
   *     "quantityGarments": 1,
   *     "id": 2
   *   },
   *   {
   *     "garment
   */
  async tableGarmentReceive(date: string) {
    try {
      const data = await this.noteRepository
        .createQueryBuilder('note')
        .select('SUM(detail_note.quantity_by_garments) as quantityGarments')
        .innerJoin('note.details', 'detail_note')
        .innerJoin('detail_note.id_g', 'garment')
        .addSelect('detail_note.id_g')
        .addSelect('garment.description')
        .where('note.createdAt =:date', {
          date: date,
        })
        .groupBy('garment.description, detail_note.id_g')
        .getRawMany();
      const newData = data.map(
        ({ garment_description, quantitygarments, idGId }) => ({
          garmentDescription: garment_description,
          quantityGarments: Number(quantitygarments),
          id: idGId,
        })
      );
      return new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        newData
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It returns the sum of the quantity of garments by garment id and garment description.
   * </code>
   * @param {string} date - string
   * @returns [
   *   {
   *     "garmentDescription": "Camisa",
   *     "quantityGarments": 1,
   *     "id": 1
   *   },
   *   {
   *     "garmentDescription": "Pantalon",
   *     "quantityGarments": 1,
   *     "id": 2
   *   },
   *   {
   *     "garmentDescription":
   */
  async tableGarmentDelivery(date: string) {
    try {
      const data = await this.noteRepository
        .createQueryBuilder('note')
        .select('SUM(detail_note.quantity_by_garments) as quantityGarments')
        .innerJoin('note.details', 'detail_note')
        .innerJoin('detail_note.id_g', 'garment')
        .addSelect('detail_note.id_g')
        .addSelect('garment.description')
        .groupBy('note.id, garment.description, detail_note.id_g')
        .where('note.updatedAt =:date and note.status =:status', {
          date: date,
          status: true,
        })
        .getRawMany();

      const newData = data.map(
        ({ garment_description, quantitygarments, idGId }) => ({
          garmentDescription: garment_description,
          quantityGarments: Number(quantitygarments),
          id: idGId,
        })
      );
      return new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        newData
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }
}
