import { Controller, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Swagger, ERestApi } from '../common';
import { ClientsService } from './clients.service';
import { UpdateClientDto, CreateClientDto } from './dto';
import { queryParamsDto } from './dto/query-params.dto';

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
  findAll(@Query() pagination: queryParamsDto) {
    return this.clientsService.findAll(pagination);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'select',
  })
  select() {
    return this.clientsService.select();
  }

  @Swagger({
    restApi: ERestApi.getOne,
    url: 'ClientInfo/:id',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @Swagger({
    restApi: ERestApi.patch,
    url: 'UpdateClient/:id',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Swagger({
    restApi: ERestApi.delete,
    url: 'DeleteClient/:id',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }
}
