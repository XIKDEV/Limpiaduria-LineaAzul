import { Controller } from '@nestjs/common';
import { DetailNotesService } from './detail_notes.service';

@Controller('detail-notes')
export class DetailNotesController {
  constructor(private readonly detailNotesService: DetailNotesService) {}
}
