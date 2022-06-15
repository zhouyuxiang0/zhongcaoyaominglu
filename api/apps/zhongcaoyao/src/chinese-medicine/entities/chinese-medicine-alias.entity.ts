import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateColumn } from '../../common/entities/date.entity';
import { ChineseMedicine } from './chinese-medicine.entity';

@Entity()
@Index(['name', 'chineseMedicine'], { unique: true })
export class ChineseMedicineAlias extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  name: string;

  @ManyToOne(
    () => ChineseMedicine,
    (chineseMedicine) => chineseMedicine.alias,
    {
      createForeignKeyConstraints: false,
    },
  )
  chineseMedicine: ChineseMedicine;

  @Column(() => DateColumn)
  date: DateColumn;
}
