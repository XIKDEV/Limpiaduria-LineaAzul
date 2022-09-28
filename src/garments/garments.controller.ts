import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseFloatPipe,
} from '@nestjs/common';
import { GarmentsService } from './garments.service';
import { CreateGarmentDto } from './dto/create-garment.dto';
import { UpdateGarmentDto } from './dto/update-garment.dto';

@Controller('garments')
export class GarmentsController {
  constructor(private readonly garmentsService: GarmentsService) {}

  @Post('CreateGarment')
  create(@Body() createGarmentDto: CreateGarmentDto) {
    return this.garmentsService.create(createGarmentDto);
  }

  @Get('GarmentsList')
  findAll() {
    return this.garmentsService.findAll();
  }

  @Get('GarmentInfo/:code_garment')
  findOne(@Param('code_garment', ParseFloatPipe) code_garment: number) {
    return this.garmentsService.findOne(code_garment);
  }

  @Patch('UpdateGarment/:id')
  update(@Param('id') id: string, @Body() updateGarmentDto: UpdateGarmentDto) {
    return this.garmentsService.update(+id, updateGarmentDto);
  }

  @Delete('DeleteGarment/:id')
  remove(@Param('id') id: string) {
    return this.garmentsService.remove(+id);
  }
}
