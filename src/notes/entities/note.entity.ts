import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';

import { DetailNote } from './detail_notes.entity';
import { Client } from '../../clients/entities/client.entity';
import { ApiProperty } from '@nestjs/swagger';
import { dayjsFormat } from '../../common';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn('identity')
  @ApiProperty()
  id: number;

  @ManyToOne(() => Client, (client) => client.notes, {
    cascade: true,
    eager: true,
  })
  @ApiProperty()
  client: Client;

  @OneToMany(() => DetailNote, (detailNote) => detailNote.id_n, {
    cascade: true,
  })
  @ApiProperty()
  details: DetailNote[];

  @Column('decimal', {
    nullable: true,
  })
  @ApiProperty()
  amount: number;

  @Column('int', {
    nullable: true,
  })
  @ApiProperty()
  total_garments: number;

  @Column('decimal', {
    nullable: true,
  })
  @ApiProperty()
  client_pay: number;

  @Column('decimal', {
    nullable: true,
  })
  @ApiProperty()
  change: number;

  @Column('decimal', {
    nullable: true,
  })
  @ApiProperty()
  missing_pay: number;

  @Column('boolean', {
    default: false,
  })
  status: boolean;

  @Column('boolean', {
    default: false,
  })
  cancel: boolean;

  @Column('date', {
    default: dayjsFormat(),
  })
  createdAt: string;

  @Column('date', {
    default: dayjsFormat(),
    select: false,
  })
  updatedAt: string;
  @Column('varchar', {
    nullable: false,
  })
  folio: string;

  @AfterLoad()
  stringToNumber(): void {
    this.amount = Number(this.amount);
    this.client_pay = Number(this.client_pay);
    this.change = Number(this.change);
    this.missing_pay = Number(this.missing_pay);
  }
}
