import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { CommonModule } from '../common/common.module';
import { DetailNote } from '../detail_notes/entities/detail_notes.entity';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [TypeOrmModule.forFeature([Note, DetailNote]), CommonModule],
})
export class NotesModule {}
