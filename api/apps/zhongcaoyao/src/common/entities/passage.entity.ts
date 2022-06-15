import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChineseMedicine } from '../../chinese-medicine/entities/chinese-medicine.entity';
import { DateColumn } from './date.entity';

@Entity()
export class Passage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ChineseMedicine,
    (chineseMedicine) => chineseMedicine.passage,
    { createForeignKeyConstraints: false },
  )
  chineseMedicine: ChineseMedicine;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column(() => DateColumn)
  date: DateColumn;
}
