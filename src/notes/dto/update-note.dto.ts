import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
