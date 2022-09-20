import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Garment {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('decimal', {
    nullable: true,
  })
  code_garment: number;

  @Column('text')
  description: string;

  @Column('int')
  number_garments: number;

  @Column('decimal', {
    default: 0,
  })
  price: number;

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
