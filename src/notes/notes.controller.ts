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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('RegisterNote')
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get('NotesList')
  findAll() {
    return this.notesService.findAll();
  }
  @Get('NotesListSearch')
  findAllSearchService() {
    return this.notesService.findAllSearchService();
  }

  @Get('NoteInfo/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id);
  }

  @Post('DeliverNote/:id')
  deliverNote(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.deliverNote(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id);
  }

  @Get('GarmentsDelivery/:date')
  garmentsDelivery(@Param('date') date: string) {
    return this.notesService.garmentsDelivery(date);
  }

  @Get('GarmentsReceived/:date')
  garmentsReceived(@Param('date') date: string) {
    return this.notesService.garmentsReceived(date);
  }

  @Get('GarmentSumDelivery/:date')
  garmentSumDelivery(@Param('date') date: string) {
    return this.notesService.totalGarmentsDelivery(date);
  }

  @Get('GarmentSumReceive/:date')
  garmentSumReceive(@Param('date') date: string) {
    return this.notesService.totalGarmentsReceived(date);
  }

  @Get('TableGarmentReceive/:date')
  tableGarmentReceive(@Param('date') date: string) {
    return this.notesService.tableGarmentReceive(date);
  }

  @Get('TableGarmentDelivery/:date')
  tableGarmentDelivery(@Param('date') date: string) {
    return this.notesService.tableGarmentDelivery(date);
  }
}
