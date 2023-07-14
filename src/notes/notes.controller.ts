import { Controller, Body, Query, Param, ParseIntPipe } from '@nestjs/common';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto';
import { EGenericResponse, ERestApi, Swagger } from '../common';
import { ApiTags } from '@nestjs/swagger';
import { queryParamsDto } from '../clients';

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

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'RegisterNote',
  })
  findAll(@Query() pagination: queryParamsDto) {
    return this.notesService.findAll(pagination);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'NotesListSearch',
  })
  findAllSearchService(@Query() pagination: queryParamsDto) {
    return this.notesService.findAllSearchService(pagination);
  }

  @Swagger({
    restApi: ERestApi.getOne,
    url: 'NoteInfo/:id',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id);
  }

  @Swagger({
    restApi: ERestApi.post,
    url: 'DeliverNote/:id',
    description: EGenericResponse.noteDelivery,
  })
  deliverNote(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.deliverNote(id);
  }

  @Swagger({
    restApi: ERestApi.delete,
    url: ':id',
    description: EGenericResponse.noteDelivery,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentsDelivery/:date',
    description: EGenericResponse.countFinish,
  })
  garmentsDelivery(@Param('date') date?: string) {
    return this.notesService.garmentsDelivery(date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentsReceived/:date',
    description: EGenericResponse.countFinish,
  })
  garmentsReceived(@Param('date') date?: string) {
    return this.notesService.garmentsReceived(date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentSumDelivery/:date',
  })
  garmentSumDelivery(@Param('date') date?: string) {
    return this.notesService.totalGarmentsDelivery(date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'GarmentSumReceive/:date',
  })
  garmentSumReceive(@Param('date') date?: string) {
    return this.notesService.totalGarmentsReceived(date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'TableGarmentReceive/:date',
  })
  tableGarmentReceive(@Param('date') date?: string) {
    return this.notesService.tableGarmentReceive(date);
  }

  @Swagger({
    restApi: ERestApi.getAll,
    url: 'TableGarmentDelivery/:date',
  })
  tableGarmentDelivery(@Param('date') date?: string) {
    return this.notesService.tableGarmentDelivery(date);
  }
}
