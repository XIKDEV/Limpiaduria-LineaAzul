import { Controller, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Swagger, ERestApi } from '../common';
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
