import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChineseMedicine } from '../../chinese-medicine/entities/chinese-medicine.entity';
import { DateColumn } from '../../common/entities/date.entity';

@Entity()
export class Taste extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  name: string;
  @ManyToMany(() => ChineseMedicine)
  chineseMedicine: ChineseMedicine[];
  @Column(() => DateColumn)
  date: DateColumn;
}
