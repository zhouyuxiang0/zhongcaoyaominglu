import { Category } from 'src/category/entities/category.entity';
import { DateColumn } from 'src/common/entities/date.entity';
import { Image } from 'src/common/entities/image.entity';
import { Passage } from 'src/common/entities/passage.entity';
import { MeridianTropism } from 'src/meridian-tropism/entities/meridian-tropism.entity';
import { Nature } from 'src/nature/entities/nature.entity';
import { Taste } from 'src/taste/entities/taste.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChineseMedicineAlias } from './chinese-medicine-alias.entity';

@Entity()
export class ChineseMedicine extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Image, (val) => val.id)
  public images: Image[];

  @OneToMany(() => ChineseMedicineAlias, (val) => val.chineseMedicine)
  public alias: ChineseMedicineAlias[];

  @OneToMany(() => Passage, (val) => val.id)
  public passage: Passage[];

  @ManyToOne(() => Category, (category) => category.id)
  public category: Category;

  @ManyToMany(() => Nature)
  @JoinTable()
  public nature: Nature[];

  @ManyToMany(() => Taste)
  @JoinTable()
  public taste: Taste[];

  @ManyToMany(() => MeridianTropism)
  @JoinTable()
  public meridianTropism: MeridianTropism[];

  @Column(() => DateColumn)
  date: DateColumn;
}
