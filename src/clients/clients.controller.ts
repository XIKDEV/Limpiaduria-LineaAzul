import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Swagger, IdParamDto, ERestApi } from '../common';
import { ClientsService } from './clients.service';
import { UpdateClientDto, CreateClientDto } from './dto';

@Controller('clients')
@ApiTags('Client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Swagger({
    restApi: ERestApi.post,
    url: 'CreateClient',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'ClientsList',
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Swagger({
    restApi: ERestApi.getOne,
    url: 'ClientInfo/:id',
  })
  findOne(@Param('id', ParseIntPipe) id: IdParamDto) {
    return this.clientsService.findOne(id.id);
  }

  @Swagger({
    restApi: ERestApi.patch,
    url: 'UpdateClient/:id',
  })
  update(
    @Param('id', ParseIntPipe) id: IdParamDto,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientsService.update(id.id, updateClientDto);
  }

  @Swagger({
    restApi: ERestApi.delete,
    url: 'DeleteClient/:id',
  })
  remove(@Param('id', ParseIntPipe) id: IdParamDto) {
    return this.clientsService.remove(id.id);
  }
}
