import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  ParseFloatPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { GarmentsService } from './garments.service';
import { UpdateGarmentDto, CreateGarmentDto } from './dto';
import { ERestApi, IdParamDto, Swagger } from 'src/common';
import { ApiTags } from '@nestjs/swagger';

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
  findAll() {
    return this.garmentsService.findAll();
  }

  @Swagger({
    restApi: ERestApi.getOne,
    url: 'GarmentInfo/:code_garment',
  })
  findOne(@Param('code_garment', ParseFloatPipe) code_garment: IdParamDto) {
    return this.garmentsService.findOne(code_garment.id);
  }

  @Swagger({
    restApi: ERestApi.patch,
    url: 'UpdateGarment/:id',
  })
  update(
    @Param('id', ParseIntPipe) id: IdParamDto,
    @Body() updateGarmentDto: UpdateGarmentDto
  ) {
    return this.garmentsService.update(id.id, updateGarmentDto);
  }

  @Swagger({
    restApi: ERestApi.delete,
    url: 'DeleteGarment/:id',
  })
  remove(@Param('id') id: IdParamDto) {
    return this.garmentsService.remove(id.id);
  }
}
