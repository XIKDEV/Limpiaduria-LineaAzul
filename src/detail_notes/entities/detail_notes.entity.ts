import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Note } from '../../notes/entities/note.entity';
import { Garment } from '../../garments/entities/garment.entity';

@Entity({ name: 'detail_notes' })
export class DetailNote {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Garment, (garment) => garment.detailNote, {
    eager: true,
  })
  id_g: Garment;

  @ManyToOne(() => Note, (note) => note.details, { onDelete: 'CASCADE' })
  id_n: Note;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
}
