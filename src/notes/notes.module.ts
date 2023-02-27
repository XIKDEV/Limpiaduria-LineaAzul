import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note, DetailNote } from './entities';
import { CommonModule } from '../common';
import { Client } from '../clients/entities';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [TypeOrmModule.forFeature([Note, DetailNote, Client]), CommonModule],
})
export class NotesModule {}
