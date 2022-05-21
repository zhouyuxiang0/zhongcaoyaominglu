import { DateColumn } from 'src/common/entities/date.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChineseMedicine } from './chinese-medicine.entity';

@Entity()
export class ChineseMedicineAlias {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  name: string;

  @ManyToOne(() => ChineseMedicine)
  chineseMedicine: ChineseMedicine;
  @Column(() => DateColumn)
  date: DateColumn;
}
