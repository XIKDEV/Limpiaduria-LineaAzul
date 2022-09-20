import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'detail_notes' })
export class DetailNote {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('int')
  id_p: number;

  @Column('int')
  id_n: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
}
