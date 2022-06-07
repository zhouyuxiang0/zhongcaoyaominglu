import { ChineseMedicine } from 'src/chinese-medicine/entities/chinese-medicine.entity';
import { DateColumn } from 'src/common/entities/date.entity';
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
