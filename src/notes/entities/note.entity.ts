import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('int')
  id_c: number;

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
}
