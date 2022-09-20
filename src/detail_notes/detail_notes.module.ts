import { Module } from '@nestjs/common';
import { DetailNotesService } from './detail_notes.service';
import { DetailNotesController } from './detail_notes.controller';

@Module({
  controllers: [DetailNotesController],
  providers: [DetailNotesService]
})
export class DetailNotesModule {}
