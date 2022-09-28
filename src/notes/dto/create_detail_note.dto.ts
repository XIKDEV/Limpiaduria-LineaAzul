import { IsNotEmpty, IsNumber } from 'class-validator';
import { Garment } from 'src/garments/entities/garment.entity';
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
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
