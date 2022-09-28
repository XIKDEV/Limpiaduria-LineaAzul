import { Note } from '../../notes/entities/note.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('identity')
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

  @OneToMany(() => Note, (note) => note.client, { onDelete: 'CASCADE' })
  notes: Note[];
}
