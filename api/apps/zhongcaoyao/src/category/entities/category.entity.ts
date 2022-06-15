import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { ChineseMedicine } from '../../chinese-medicine/entities/chinese-medicine.entity';
import { DateColumn } from '../../common/entities/date.entity';

@Entity()
@Tree('closure-table')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(
    () => ChineseMedicine,
    (chineseMedicine) => chineseMedicine.category,
  )
  chineseMedicine: ChineseMedicine;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @Column(() => DateColumn)
  date: DateColumn;
}
