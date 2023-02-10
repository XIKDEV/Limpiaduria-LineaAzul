import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DetailNote } from '../../detail_notes/entities/detail_notes.entity';
import { Client } from '../../clients/entities/client.entity';
import { Transform } from 'class-transformer';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Client, (client) => client.notes, {
    cascade: true,
    eager: true,
  })
  client: Client;

  @OneToMany(() => DetailNote, (detailNote) => detailNote.id_n, {
    cascade: true,
  })
  details: DetailNote[];

  @Column('decimal')
  amount: number;

  @Column('int')
  total_garments: number;

  @Column('decimal')
  client_pay: number;

  @Column('decimal')
  change: number;

  @Column('decimal')
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
    default: new Date().toLocaleDateString('en-US'),
  })
  createdAt: string;

  @Column('date', {
    default: new Date().toLocaleDateString('en-US'),
    select: false,
  })
  updatedAt: string;

  @AfterLoad()
  stringToNumber(): void {
    this.amount = Number(this.amount);
    this.client_pay = Number(this.client_pay);
    this.change = Number(this.change);
    this.missing_pay = Number(this.missing_pay);
  }
}
