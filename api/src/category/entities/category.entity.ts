import { DateColumn } from 'src/common/entities/date.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @ManyToOne(() => Category, (category) => category.childCategory)
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  childCategory: Category[];
  @Column(() => DateColumn)
  date: DateColumn;
}
