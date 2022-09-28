import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseGenericDto } from 'src/common/response/reponse-generic.dto';
import { ResponseGenericInfoDto } from 'src/common/response/response-generic-info.dto';

import { Repository } from 'typeorm';

import { ErrorCatchService } from '../common/error-catch/error-catch.service';
import { CreateGarmentDto } from './dto/create-garment.dto';
import { UpdateGarmentDto } from './dto/update-garment.dto';
import { Garment } from './entities/garment.entity';

@Injectable()
export class GarmentsService {
  constructor(
    @InjectRepository(Garment)
    private readonly garmentRepository: Repository<Garment>,
    private readonly errorCatch: ErrorCatchService,
  ) {}

  async create(createGarmentDto: CreateGarmentDto) {
    try {
      const data = await this.garmentRepository.create(createGarmentDto);

      const { id } = await this.garmentRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Garment was created',
        id,
      );
    } catch (error) {
      return this.errorCatch.errorCatch();
    }
  }

  async findAll() {
    const data = await this.garmentRepository.find({
      select: {
        id: true,
        code_garment: true,
        description: true,
        number_garments: true,
        price: true,
      },
      where: {
        status: true,
      },
      order: {
        id: 'ASC',
      },
    });

    return new ResponseGenericDto().createResponse(
      true,
      'Information found',
      data,
    );
  }

  async findOne(code_garment: number) {
    const data = await this.garmentRepository.findOneBy({
      code_garment,
      status: true,
    });

    if (!data || data === null)
      return this.errorCatch.notExitsCatch(code_garment);

    return new ResponseGenericInfoDto().createResponse(
      true,
      'Information found',
      data,
    );
  }

  async update(idGarment: number, updateGarmentDto: UpdateGarmentDto) {
    try {
      const data = await this.garmentRepository.preload({
        id: idGarment,
        ...updateGarmentDto,
        updatedAt: new Date().toLocaleDateString('en-US'),
      });

      if (!data || !data.status)
        return this.errorCatch.notExitsCatch(idGarment);

      const { id, code_garment, description, number_garments, price } =
        await this.garmentRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Garment was updated',
        { id, code_garment, description, number_garments, price },
      );
    } catch (error) {
      return this.errorCatch.errorCatch();
    }
  }

  async remove(id: number) {
    try {
      const data = await this.garmentRepository.update(
        { id },
        { status: false, updatedAt: new Date().toLocaleDateString('en-US') },
      );

      if (!data) return this.errorCatch.notExitsCatch(id);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Garment was deleted',
        id,
      );
    } catch (error) {
      return this.errorCatch.errorCatch();
    }
  }
}
