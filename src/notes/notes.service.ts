import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Client } from '../clients/entities';
import {
  ResponseGenericInfoDto,
  ErrorCatchService,
  ResponseGenericDto,
  EGenericResponse,
  EExceptionsOptions,
} from '../common';
import { CreateNoteDto } from './dto';
import { Note, DetailNote } from './entities';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(DetailNote)
    private readonly detailNoteRepository: Repository<DetailNote>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly errorCatch: ErrorCatchService
  ) {}

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

  async newFolio() {
    try {
      const data = await this.noteRepository.find({
        order: {
          id: 'ASC',
        },
        select: { id: true },
      });
      if (!data.length) {
        return new ResponseGenericInfoDto().createResponse(
          true,
          EGenericResponse.newFolio,
          {
            id: 1,
          }
        );
      }
      const newFolio = data.pop().id + 1;
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

  async findAll() {
    try {
      const data = await this.noteRepository.find({
        relations: {
          details: true,
          client: true,
        },
        where: {
          status: false,
          cancel: false,
        },
      });
      console.log(data);
      return new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        data.map((note) => {
          const { client, amount, missing_pay, id, createdAt: created } = note;
          const { email, cellphone, ...clientInfo } = client;

          return {
            id,
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
        })
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  async findAllSearchService() {
    try {
      const data = await this.noteRepository.find({
        relations: {
          details: true,
          client: true,
        },
        where: {
          cancel: false,
        },
      });
      return new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        data.map((note) => {
          const {
            client,
            amount,
            missing_pay,
            id,
            status: statusNote,
            createdAt: created,
          } = note;
          const { email, cellphone, ...clientInfo } = client;

          return {
            id,
            created,
            statusNote,
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
        })
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

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

  async deliverNote(id: number) {
    try {
      const data = await this.noteRepository.update(id, {
        missing_pay: 0,
        status: true,
        updatedAt: new Date().toLocaleDateString('en-US'),
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

  async remove(id: any) {
    try {
      const data = await this.noteRepository.preload({
        id,
        cancel: true,
        updatedAt: new Date().toLocaleDateString('en-US'),
      });

      if (!data) throw new Error(EExceptionsOptions.notFoundNote);

      await this.detailNoteRepository.update(
        {
          id_n: id,
        },
        {
          active: false,
          updatedAt: new Date().toLocaleDateString('en-US'),
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
      if (!data.sum)
        return new ResponseGenericInfoDto().createResponse(
          true,
          EGenericResponse.notGarmentDelivery,
          { total: 0 }
        );

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.found,
        { total: Number(data.sum) }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  async totalGarmentsReceived(date: string) {
    try {
      const data = await this.noteRepository
        .createQueryBuilder('note')
        .select('SUM(note.total_garments)')
        .where('note.createdAt =:date', {
          date: date,
        })
        .getRawOne();

      if (!data.sum)
        return new ResponseGenericInfoDto().createResponse(
          true,
          EGenericResponse.notGarmentDelivery,
          { total: Number(data.sum) }
        );

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.found,
        { total: Number(data.sum) }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

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
