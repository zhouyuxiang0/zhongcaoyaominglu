import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChineseMedicine } from '../../chinese-medicine/entities/chinese-medicine.entity';
import { DateColumn } from './date.entity';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  url: string;

  @ManyToMany(() => ChineseMedicine, (image) => image.images)
  chineseMedicine: ChineseMedicine;

  @Column(() => DateColumn)
  date: DateColumn;
}
