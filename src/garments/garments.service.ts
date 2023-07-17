import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateGarmentDto, UpdateGarmentDto } from './dto';
import { Garment } from './entities';
import {
  EExceptionsOptions,
  EGenericResponse,
  ErrorCatchService,
  ResponseGenericDto,
  ResponseGenericInfoDto,
  pagination,
} from '../common';
import { queryParamsDto } from '../clients';

@Injectable()
export class GarmentsService {
  constructor(
    @InjectRepository(Garment)
    private readonly garmentRepository: Repository<Garment>,
    private readonly errorCatch: ErrorCatchService
  ) {}

  /**
   * It creates a new garment and returns the id of the newly created garment
   * @param {CreateGarmentDto} createGarmentDto - CreateGarmentDto
   * @returns A ResponseGenericInfoDto object.
   */
  async create(createGarmentDto: CreateGarmentDto) {
    try {
      const data = this.garmentRepository.create(createGarmentDto);

      const { id } = await this.garmentRepository.save(data);

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
   * It returns a response object with a boolean, a string, and an array of objects.
   * @returns A ResponseGenericDto object.
   */
  async findAll({ page, rows }: queryParamsDto) {
    try {
      const { skip, take } = pagination({ page, rows });

      const data = await this.garmentRepository.findAndCount({
        where: {
          status: true,
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });

      return new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        data[0],
        {
          count: data[1],
          page: skip / 10,
          rows: take,
        }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It finds a garment by its code_garment and returns a response with the data or an error.
   * @param {number} code_garment - number
   * @returns The response is a JSON object with the following structure:
   */
  async findOne(code_garment: number) {
    try {
      const data = await this.garmentRepository.findOneBy({
        code_garment,
        status: true,
      });

      if (!data) throw new Error(EExceptionsOptions.notFoundGarment);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Information found',
        data
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * "The function receives an id and an object with the data to be updated, then it searches for the
   * id in the database, if it does not find it, it throws an error, if it finds it, it updates the
   * data and returns the updated data."
   * </code>
   * @param {number} idGarment - number, updateGarmentDto: UpdateGarmentDto
   * @param {UpdateGarmentDto} updateGarmentDto - UpdateGarmentDto
   * @returns a responseGenericInfoDto object.
   */
  async update(idGarment: number, updateGarmentDto: UpdateGarmentDto) {
    try {
      const data = await this.garmentRepository.preload({
        id: idGarment,
        ...updateGarmentDto,
        updatedAt: new Date().toLocaleDateString('en-US'),
      });

      if (!data) throw new Error(EExceptionsOptions.notFoundGarment);

      const { id, code_garment, description, number_garments, price } =
        await this.garmentRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.update,
        { id, code_garment, description, number_garments, price }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

  /**
   * It updates the status of the garment to false and the updatedAt to the current date.
   * @param {number} id - number
   * @returns The response is a generic response that is created in the response-generic-info.dto.ts
   * file.
   */
  async remove(id: number) {
    try {
      const data = await this.garmentRepository.update(
        { id },
        { status: false, updatedAt: new Date().toLocaleDateString('en-US') }
      );

      if (!data) throw new Error(EExceptionsOptions.notFoundGarment);

      return new ResponseGenericInfoDto().createResponse(
        true,
        EGenericResponse.delete,
        { id }
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }
}
