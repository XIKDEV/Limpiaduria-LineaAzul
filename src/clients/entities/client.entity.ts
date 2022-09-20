import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  cellphone: string;

  @Column('boolean', {
    default: true,
  })
  status: boolean;

  @Column('date', {
    default: new Date().toLocaleDateString('en-US'),
  })
  createdAt: Date;

  @Column('date')
  updatedAt: Date;
}
