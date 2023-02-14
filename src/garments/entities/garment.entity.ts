import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  ViewColumn,
} from 'typeorm';

import { DetailNote } from '../../notes/entities/detail_notes.entity';

@Entity()
export class Garment {
  @PrimaryGeneratedColumn('identity')
  @ApiProperty()
  id: number;

  @Column('decimal')
  @Index({
    unique: true,
    where: '(status=true)',
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
    select: false,
  })
  status: boolean;

  @Column('date', {
    default: new Date().toLocaleDateString('en-US'),
    select: false,
  })
  createdAt: Date;

  @Column('date', {
    default: new Date().toLocaleDateString('en-US'),
    select: false,
  })
  updatedAt: Date;

  @ManyToOne(() => DetailNote, (detail) => detail.id_g)
  detailNote: DetailNote;

  @AfterLoad()
  stringToNumber(): void {
    this.code_garment = Number(this.code_garment);
    this.price = Number(this.price);
  }
}
