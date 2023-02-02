import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ResponseGenericInfoDto } from '../common/response/response-generic-info.dto';
import { ErrorCatchService } from '../common/error-catch/error-catch.service';
import { ResponseGenericDto } from '../common/response/reponse-generic.dto';
import { DetailNote } from '../detail_notes/entities/detail_notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(DetailNote)
    private readonly detailNoteRepository: Repository<DetailNote>,
    private readonly errorCatch: ErrorCatchService
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      const { details = [], ...createDetail } = createNoteDto;

      const data = this.noteRepository.create({
        ...createDetail,
        details: details.map(({ id_g, price, quantity }) =>
          this.detailNoteRepository.create({
            id_g: id_g,
            quantity: quantity,
            price: price,
          })
        ),
      });

      const { id } = await this.noteRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Note was created',
        id
      );
    } catch (error) {
      console.log(error);
      return this.errorCatch.errorCatch();
    }
  }

  async newFolio() {
    try {
      const data = await this.noteRepository.find({
        order: {
          id: 'ASC'
        },
        select: { id: true },
      });
      if (!data.length) {
        return new ResponseGenericInfoDto().createResponse(true, 'New Folio', { id: 1 });
      }
      const newFolio = data.pop().id + 1;
      return new ResponseGenericInfoDto().createResponse(true, 'New Folio', { id: newFolio });
    } catch (error) {
      return this.errorCatch.errorCatch();
    }
  }

  async findAll() {
    const data = await this.noteRepository.find({
      relations: {
        details: true,
      },
      where: {
        status: false,
        cancel: false,
      },
    });
    return new ResponseGenericDto().createResponse(
      true,
      'Information found',
      data.map((note) => {
        const {
          client,
          amount,
          missing_pay,
          id,
          createdAt: created,
          ...noteInfo
        } = note;
        const { status, createdAt, updatedAt, email, cellphone, ...clientInfo } =
          client;

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
  }

  async findAllSearchService() {
    const data = await this.noteRepository.find({
      relations: {
        details: true,
      },
      where: {
        cancel: false
      },
    });
    return new ResponseGenericDto().createResponse(
      true,
      'Information found',
      data.map((note) => {
        const {
          client,
          amount,
          missing_pay,
          id,
          status: statusNote,
          createdAt: created,
          ...noteInfo
        } = note;
        const { status, createdAt, updatedAt, email, cellphone, ...clientInfo } =
          client;

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
  }

  async findOne(id: number) {
    const { client, ...data } = await this.noteRepository.findOne({
      where: { id, cancel: false },
      relations: {
        details: true,
      },
    });

    if (!data) {
      return this.errorCatch.notExitsCatch(id);
    }

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
      'Information found',
      noteFind
    );
  }

  async deliverNote(id: number) {
    try {
      const data = await this.noteRepository.update(id, {
        missing_pay: 0,
        status: true,
        updatedAt: new Date().toLocaleDateString('en-US'),
      });

      if (!data) return this.errorCatch.notExitsCatch(id);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Note was delivered',
        id
      );
    } catch (error) {
      return this.errorCatch.errorCatch();
    }
  }

  async remove(id: any) {
    try {
      const data = await this.noteRepository.preload({
        id,
        cancel: true,
        updatedAt: new Date().toLocaleDateString('en-US'),
      });

      await this.detailNoteRepository.update({
        id_n: id,
      }, {
        active: false,
        updatedAt: new Date().toLocaleDateString('en-US'),
      })

      if (!data) return this.errorCatch.notExitsCatch(id);
      
      await this.noteRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Note was canceled',
        id
      );
    } catch (error) {
      console.log(error)
      return this.errorCatch.errorCatch();
    }
  }

  async garmentsDelivery(date: string) {
    const data = await this.noteRepository.count({
      where: {
        status: true,
        updatedAt: date,
      },
    });

    return new ResponseGenericInfoDto().createResponse(true, 'Count finish', data);
  }

  async garmentsReceived(date: string) {
    const data = await this.noteRepository.count({
      where: {
        createdAt: date,
      },
    });

    return new ResponseGenericInfoDto().createResponse(true, 'Count finish', data);
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
      if (data.sum === null)
        return new ResponseGenericInfoDto().createResponse(
          false,
          'Not Garment delivery this day',
          0
        );

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Info found',
        Number(data.sum)
      );
    } catch (error) {
      return this.errorCatch.errorCatch();
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

      if (data.sum === null)
        return new ResponseGenericInfoDto().createResponse(
          false,
          'Not Garment delivery this day',
          Number(data.sum)
        );

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Info found',
        Number(data.sum)
      );
    } catch (error) {
      return this.errorCatch.errorCatch();
    }
  }

  async tableGarmentReceive(date: string) {
    try {
      const data = await this.noteRepository
        .createQueryBuilder('note')
        .select('SUM(detail_note.quantity) as quantityGarments')
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
      return new ResponseGenericDto().createResponse(true, 'count finish', newData);
    } catch (error) {
      console.log(error);
      return this.errorCatch.errorCatch();
    }
  }

  async tableGarmentDelivery(date: string) {
    try {
      const data = await this.noteRepository
        .createQueryBuilder('note')
        .select('SUM(detail_note.quantity) as quantityGarments')
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

      if (data.length == 0)
        return new ResponseGenericDto().createResponse(
          false,
          'Not Garment Delivery'
        );

      const newData = data.map(
        ({ garment_description, quantitygarments, idGId }) => ({
          garmentDescription: garment_description,
          quantityGarments: Number(quantitygarments),
          id: idGId,
        })
      );
      return new ResponseGenericDto().createResponse(true, 'count finish', newData);
    } catch (error) {
      console.log(error);
      return this.errorCatch.errorCatch();
    }
  }
}
