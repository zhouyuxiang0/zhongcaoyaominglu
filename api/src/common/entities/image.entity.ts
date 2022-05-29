import { ChineseMedicine } from 'src/chinese-medicine/entities/chinese-medicine.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumn } from './date.entity';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => ChineseMedicine, (val) => val.id)
  chineseMedicine: ChineseMedicine;

  @Column(() => DateColumn)
  date: DateColumn;
}
