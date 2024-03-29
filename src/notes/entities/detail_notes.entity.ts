import * as dayjs from 'dayjs';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Note } from './note.entity';
import { Garment } from '../../garments/entities/garment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { dayjsFormat } from '../../common';

@Entity({ name: 'detail_notes' })
export class DetailNote {
  @PrimaryGeneratedColumn('identity')
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ManyToOne(() => Garment, (garment) => garment.detailNote, {
    eager: true,
  })
  @ApiProperty()
  @IsNotEmpty()
  id_g: Garment;

  @ManyToOne(() => Note, (note) => note.details, { onDelete: 'CASCADE' })
  @ApiProperty()
  @IsNotEmpty()
  id_n: Note;

  @Column('int', {
    nullable: true,
  })
  quantity_receive: number;

  @Column('int', {
    nullable: true,
  })
  quantity_by_garments: number;

  @Column('decimal', {
    nullable: true,
  })
  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @Column('boolean', {
    default: true,
    select: false,
  })
  active: boolean;

  @Column('date', {
    default: dayjsFormat(),
  })
  createdAt: string;

  @Column('date', {
    default: dayjsFormat(),
    select: false,
  })
  updatedAt: string;
}
