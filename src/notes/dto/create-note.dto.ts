import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Client } from '../../clients/entities/client.entity';
import { DetailNote } from '../../detail_notes/entities/detail_notes.entity';
import { DetailNoteDto } from './create_detail_note.dto';

export class CreateNoteDto {
  @IsNumber()
  @IsNotEmpty()
  client: Client;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  total_garments: number;

  @IsNumber()
  @IsNotEmpty()
  client_pay: number;

  @IsNumber()
  @IsNotEmpty()
  change: number;

  @IsNumber()
  @IsNotEmpty()
  missing_pay: number;

  @IsArray()
  details: DetailNoteDto[];
}
