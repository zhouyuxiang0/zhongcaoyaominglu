import { DateColumn } from 'src/common/entities/date.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChineseMedicine } from './chinese-medicine.entity';

@Entity()
export class ChineseMedicineAlias extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  name: string;

  @ManyToOne(() => ChineseMedicine, (chineseMedicine) => chineseMedicine.alias)
  chineseMedicine: ChineseMedicine;

  @Column(() => DateColumn)
  date: DateColumn;
}
