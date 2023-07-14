import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from '../../notes/entities';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('identity')
  @ApiProperty()
  id: number;

  @Column('text', {
    nullable: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  email: string;

  @Column('text', {
    nullable: true,
  })
  cellphone: string;

  @Column('boolean', {
    default: true,
    select: false,
  })
  status: boolean;

  @Column('date', {
    default: new Date(),
    select: false,
  })
  createdAt: Date;

  @Column('date', {
    default: new Date(),
    select: false,
  })
  updatedAt: Date;

  @OneToMany(() => Note, (note) => note.client, { onDelete: 'CASCADE' })
  notes: Note[];
}
