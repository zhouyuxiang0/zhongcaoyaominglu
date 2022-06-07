import { ChineseMedicine } from 'src/chinese-medicine/entities/chinese-medicine.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateColumn } from './date.entity';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  url: string;

  @ManyToOne(() => ChineseMedicine, (image) => image.images)
  chineseMedicine: ChineseMedicine;

  @Column(() => DateColumn)
  date: DateColumn;
}
