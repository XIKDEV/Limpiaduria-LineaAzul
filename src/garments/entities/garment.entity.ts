import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DetailNote } from '../../notes/entities/detail_notes.entity';

@Entity()
export class Garment {
  @PrimaryGeneratedColumn('identity')
  @ApiProperty()
  id: number;

  @Column('decimal', {
    unique: true,
  })
  @ApiProperty()
  code_garment: number;

  @Column('text')
  @ApiProperty()
  description: string;

  @Column('int')
  @ApiProperty()
  number_garments: number;

  @Column('decimal', {
    default: 0,
  })
  @ApiProperty()
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
