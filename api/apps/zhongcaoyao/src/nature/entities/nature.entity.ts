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
export class Nature extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToMany(() => ChineseMedicine)
  chineseMedicine: ChineseMedicine[];
  @Column()
  name: string;
  @Column(() => DateColumn)
  date: DateColumn;
}
