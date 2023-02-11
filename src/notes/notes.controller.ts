import { Controller, Get, Body, Param, ParseIntPipe } from '@nestjs/common';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto';
import {
  DateParamDto,
  EGenericResponse,
  ERestApi,
  IdParamDto,
  Swagger,
} from '../common';
import { ApiTags } from '@nestjs/swagger';

@Controller('notes')
@ApiTags('Note')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Swagger({
    restApi: ERestApi.post,
    url: 'RegisterNote',
  })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'NewFolio',
    description: EGenericResponse.newFolio,
  })
  newFolio() {
    return this.notesService.newFolio();
  }

  @Get('NotesList')
  @Swagger({
    restApi: ERestApi.getAll,
    url: 'RegisterNote',
  })
  findAll() {
    return this.notesService.findAll();
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'NotesListSearch',
  })
  findAllSearchService() {
    return this.notesService.findAllSearchService();
  }

  @Swagger({
    restApi: ERestApi.getOne,
    url: 'NoteInfo/:id',
  })
  findOne(@Param('id', ParseIntPipe) id: IdParamDto) {
    return this.notesService.findOne(id.id);
  }

  @Swagger({
    restApi: ERestApi.post,
    url: 'DeliverNote/:id',
    description: EGenericResponse.noteDelivery,
  })
  deliverNote(@Param('id', ParseIntPipe) id: IdParamDto) {
    return this.notesService.deliverNote(id.id);
  }

  @Swagger({
    restApi: ERestApi.delete,
    url: ':id',
    description: EGenericResponse.noteDelivery,
  })
  remove(@Param('id', ParseIntPipe) id: IdParamDto) {
    return this.notesService.remove(id.id);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentsDelivery/:date',
    description: EGenericResponse.countFinish,
  })
  garmentsDelivery(@Param('date') date: DateParamDto) {
    return this.notesService.garmentsDelivery(date.date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentsReceived/:date',
    description: EGenericResponse.countFinish,
  })
  garmentsReceived(@Param('date') date: DateParamDto) {
    return this.notesService.garmentsReceived(date.date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentSumDelivery/:date',
  })
  garmentSumDelivery(@Param('date') date: DateParamDto) {
    return this.notesService.totalGarmentsDelivery(date.date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentSumReceive/:date',
  })
  garmentSumReceive(@Param('date') date: DateParamDto) {
    return this.notesService.totalGarmentsReceived(date.date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'TableGarmentReceive/:date',
  })
  tableGarmentReceive(@Param('date') date: DateParamDto) {
    return this.notesService.tableGarmentReceive(date.date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'TableGarmentDelivery/:date',
  })
  tableGarmentDelivery(@Param('date') date: DateParamDto) {
    return this.notesService.tableGarmentDelivery(date.date);
  }
}
