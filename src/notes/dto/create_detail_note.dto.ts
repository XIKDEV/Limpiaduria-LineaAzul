import { IsNotEmpty, IsNumber } from 'class-validator';

import { Garment } from '../../garments/entities/garment.entity';
import { Note } from '../entities/note.entity';

export class DetailNoteDto {
  @IsNumber()
  @IsNotEmpty()
  id_g: Garment;

  @IsNumber()
  @IsNotEmpty()
  id_n: Note;

  @IsNumber()
  @IsNotEmpty()
  quantity_receive: number;
  @IsNumber()
  @IsNotEmpty()
  quantity_by_garments: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
