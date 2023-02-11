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
} from '../common';

@Injectable()
export class GarmentsService {
  constructor(
    @InjectRepository(Garment)
    private readonly garmentRepository: Repository<Garment>,
    private readonly errorCatch: ErrorCatchService
  ) {}

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

  async findAll() {
    try {
      const data = await this.garmentRepository.find({
        where: {
          status: true,
        },
        order: {
          id: 'ASC',
        },
      });

      return new ResponseGenericDto().createResponse(
        true,
        EGenericResponse.found,
        data
      );
    } catch (error) {
      return this.errorCatch.exceptionsOptions(error);
    }
  }

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
