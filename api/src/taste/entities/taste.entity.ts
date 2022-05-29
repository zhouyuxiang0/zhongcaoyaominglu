import { ChineseMedicine } from 'src/chinese-medicine/entities/chinese-medicine.entity';
import { DateColumn } from 'src/common/entities/date.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
