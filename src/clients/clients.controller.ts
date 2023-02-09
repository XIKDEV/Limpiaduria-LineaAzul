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

import { ERestApi } from '../common/interfaces';
import { Swagger } from '../common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
@ApiTags('Client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('CreateClient')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Swagger({
    restApi: ERestApi.get,
    url: 'ClientsList',
    modules: 'Client',
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get('ClientInfo/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @Patch('UpdateClient/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete('DeleteClient/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }
}
