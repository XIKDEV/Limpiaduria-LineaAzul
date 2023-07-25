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
import * as dayjs from 'dayjs';

import { DetailNote } from '../../notes/entities/detail_notes.entity';

@Entity()
export class Garment {
  @PrimaryGeneratedColumn('identity')
  @ApiProperty()
  id: number;

  @Column('varchar', {
    nullable: true,
  })
  @Index({
    unique: true,
    where: '(status=true)',
  })
  @ApiProperty()
  code_garment: string;

  @Column('text', {
    nullable: true,
  })
  @ApiProperty()
  description: string;

  @Column('int', {
    nullable: true,
  })
  @ApiProperty()
  number_garments: number;

  @Column('decimal', {
    default: 0,
    nullable: true,
  })
  @ApiProperty()
  price: number;

  @Column('boolean', {
    default: true,
    select: false,
  })
  status: boolean;

  @Column('date', {
    default: dayjs().format('YYYY-MM-DD'),
    select: false,
  })
  createdAt: Date;

  @Column('date', {
    default: dayjs().format('YYYY-MM-DD'),
    select: false,
  })
  updatedAt: Date;

  @ManyToOne(() => DetailNote, (detail) => detail.id_g)
  detailNote: DetailNote;

  @AfterLoad()
  stringToNumber(): void {
    this.price = Number(this.price);
  }
}
