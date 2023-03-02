import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateClientDto, UpdateClientDto, ClientListDto } from './dto';
import { Client } from './entities';
import {
  EExceptionsOptions,
  EGenericResponse,
  ResponseGenericInfoDto,
  ErrorCatchService,
  ResponseGenericDto,
} from '../common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly errorCatch: ErrorCatchService
  ) {}

  /**
   * It creates a new client and returns a response with the id of the created client
   * @param {CreateClientDto} createClientDto - CreateClientDto
   * @returns A ResponseGenericInfoDto object.
   */
  async create(createClientDto: CreateClientDto) {
    try {
      const data = this.clientRepository.create(createClientDto);

      const { id } = await this.clientRepository.save(data);

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
   * I'm trying to get all the clients that are active, and I want to get all the notes that are
   * related to each client.
   * @returns A ResponseGenericDto<ClientListDto>
   */
  async findAll(): Promise<any> {
    try {
      const data = await this.clientRepository.find({
        where: { status: true },
        select: { id: true, name: true, email: true, cellphone: true },
        order: {
          id: 'ASC',
        },
        relations: {
          notes: true,
        },
      });

      return new ResponseGenericDto<ClientListDto>(ClientListDto).createResponse(
        true,
        EGenericResponse.found,
        data.map((client) => ({
          ...client,
          notes: client.notes.map((note) => {
            const { client, ...noteRest } = note;
            return { ...noteRest };
          }),
        }))
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  async findAllQB() {
    try {
      const data = await this.clientRepository
        .createQueryBuilder('client')
        .where('client.status =:status', {
          status: true,
        })
        .leftJoinAndSelect('client.notes', 'notes')
        .leftJoinAndSelect('notes.details', 'detail_note')
        .leftJoinAndSelect('detail_note.id_g', 'garment')
        .getMany();

      return data;
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * "I'm trying to get the client's notes, but I don't want to get the client's data in the notes."
   * </code>
   * @param {number} id - number
   * @returns {
   *   "success": true,
   *   "message": "Cliente encontrado",
   *   "data": {
   *     "id": 1,
   *     "name": "Cliente 1",
   *     "email": "cliente1@gmail.com",
   *     "phone": "123456789",
   *     "notes": [
   *       {
   */
  async findOne(id: number) {
    try {
      const data = await this.clientRepository.findOne({
        where: {
          id,
          status: true,
        },
        relations: {
          notes: true,
        },
      });

      if (!data) throw new Error(EExceptionsOptions.notFoundClient);

      const { notes, ...restData } = data;

      const clientInfo = {
        ...restData,
        notes: notes.map(({ client, ...noteRest }) => {
          return {
            ...noteRest,
          };
        }),
      };
      return new ResponseGenericInfoDto<ClientListDto>(ClientListDto).createResponse(
        true,
        EGenericResponse.found,
        clientInfo
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It updates a client in the database, if it exists, and returns a response with the updated client's
   * data.
   * @param {number} idClient - number
   * @param {UpdateClientDto} updateClientDto - UpdateClientDto
   * @returns The response is a generic response that is created in the class ResponseGenericInfoDto.
   */
  async update(idClient: number, updateClientDto: UpdateClientDto) {
    try {
      const data = await this.clientRepository.preload({
        id: idClient,
        ...updateClientDto,
        updatedAt: new Date().toLocaleDateString('en-US'),
      });

      if (!data) throw new Error(EExceptionsOptions.notFoundClient);

      const { id, name, email, cellphone } = await this.clientRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.update,
        { id, name, email, cellphone }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It updates the status of a client to false and returns a response with the id of the client.
   * @param {number} idClient - number
   * @returns The response is a generic response, which is a class that has a method that returns a
   * generic response.
   */
  async remove(idClient: number) {
    try {
      const data = this.clientRepository.update(
        { id: idClient },
        { status: false, updatedAt: new Date().toLocaleDateString('en-US') }
      );

      if (!data) throw new Error(EExceptionsOptions.notFoundClient);

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.delete,
        { idClient }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }
}
