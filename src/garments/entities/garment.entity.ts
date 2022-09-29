import { DetailNote } from 'src/detail_notes/entities/detail_notes.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Garment {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('decimal', {
    unique: true,
  })
  code_garment: number;

  @Column('text')
  description: string;

  @Column('int')
  number_garments: number;

  @Column('decimal', {
    default: 0,
  })
  price: number;

  @Column('boolean', {
    default: true,
  })
  status: boolean;

  @Column('date', {
    default: new Date().toLocaleDateString('en-US'),
  })
  createdAt: Date;

  @Column('date', {
    default: new Date().toLocaleDateString('en-US'),
  })
  updatedAt: Date;

  @ManyToOne(() => DetailNote, (detail) => detail.id_g)
  detailNote: DetailNote;
}
