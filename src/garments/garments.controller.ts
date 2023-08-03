import {
  Controller,
  Body,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { GarmentsService } from './garments.service';
import { UpdateGarmentDto, CreateGarmentDto } from './dto';
import { ERestApi, Swagger } from '../common';
import { ApiTags } from '@nestjs/swagger';
import { queryParamsDto } from '../clients';

@Controller('garments')
@ApiTags('Garment')
export class GarmentsController {
  constructor(private readonly garmentsService: GarmentsService) {}

  @Swagger({
    restApi: ERestApi.post,
    url: 'CreateGarment',
  })
  create(@Body() createGarmentDto: CreateGarmentDto) {
    return this.garmentsService.create(createGarmentDto);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentsList',
  })
  findAll(@Query() pagination: queryParamsDto) {
    return this.garmentsService.findAll(pagination);
  }

  @Swagger({
    restApi: ERestApi.getOne,
    url: 'GarmentInfo/:code_garment',
  })
  findOne(@Param('code_garment') code_garment: string) {
    return this.garmentsService.findOne(code_garment);
  }

  @Swagger({
    restApi: ERestApi.patch,
    url: 'UpdateGarment/:id',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGarmentDto: UpdateGarmentDto
  ) {
    return this.garmentsService.update(id, updateGarmentDto);
  }

  @Swagger({
    restApi: ERestApi.delete,
    url: 'DeleteGarment/:id',
  })
  remove(@Param('id') id: number) {
    return this.garmentsService.remove(id);
  }
}
