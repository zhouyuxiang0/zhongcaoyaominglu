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
