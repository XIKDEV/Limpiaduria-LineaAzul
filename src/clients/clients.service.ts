import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ResponseGenericDto } from '../common/response/reponse-generic.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { ClientListDto } from './dto/client-list.dto';
import { ResponseGenericInfoDto } from '../common/response/response-generic-info.dto';
import { ErrorCatchService } from '../common/error-catch/error-catch.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly errorCatch: ErrorCatchService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const data = this.clientRepository.create(createClientDto);

      const { id } = await this.clientRepository.save(data);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Client was created',
        { id },
      );
    } catch (error) {
      this.errorCatch.errorCatch();
    }
  }

  async findAll() {
    const data = await this.clientRepository.find({
      where: { status: true },
      select: { name: true, email: true, cellphone: true },
    });

    return new ResponseGenericDto<ClientListDto>(ClientListDto).createResponse(
      true,
      'Information found',
      data,
    );

    // return {
    //   success: true,
    //   data,
    //   message: 'Information found'
    // }
  }

  async findOne(id: number) {
    const data = await this.clientRepository.findOneBy({
      id: id,
      status: true,
    });

    if (!data) {
      return this.errorCatch.notExitsCatch(id);
    }
    if (data == null) {
      return this.errorCatch.notExitsCatch(id);
    }

    return new ResponseGenericInfoDto<ClientListDto>(
      ClientListDto,
    ).createResponse(true, 'Information found', data);
  }

  async update(idClient: number, updateClientDto: UpdateClientDto) {
    try {
      const data = await this.clientRepository.preload({
        id: idClient,
        ...updateClientDto,
      });

      if (!data) return this.errorCatch.notExitsCatch(idClient);

      const { id, name, email, cellphone } = await this.clientRepository.save(
        data,
      );

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Client was updated',
        { id, name, email, cellphone },
      );
    } catch (error) {
      this.errorCatch.errorCatch();
    }
  }

  async remove(idClient: number) {
    try {
      const data = this.clientRepository.update(
        { id: idClient },
        { status: false },
      );

      if (!data) return this.errorCatch.notExitsCatch(idClient);

      return new ResponseGenericInfoDto().createResponse(
        true,
        'Client was deleted',
        { idClient },
      );
    } catch (error) {
      return this.errorCatch.errorCatch();
    }
  }
}
