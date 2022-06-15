import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { DateColumn } from '../../common/entities/date.entity';
import { Image } from '../../common/entities/image.entity';
import { Passage } from '../../common/entities/passage.entity';
import { MeridianTropism } from '../../meridian-tropism/entities/meridian-tropism.entity';
import { Nature } from '../../nature/entities/nature.entity';
import { Taste } from '../../taste/entities/taste.entity';
import { ChineseMedicineAlias } from './chinese-medicine-alias.entity';

@Entity()
export class ChineseMedicine extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(() => Image, (image) => image.chineseMedicine, {
    cascade: true,
  })
  @JoinTable()
  public images: Image[];

  @OneToMany(() => ChineseMedicineAlias, (val) => val.chineseMedicine, {
    cascade: true,
    eager: true,
  })
  public alias: ChineseMedicineAlias[];

  @OneToMany(() => Passage, (val) => val.chineseMedicine, {
    cascade: true,
  })
  public passage: Passage[];

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn()
  public category: Category;

  @ManyToMany(() => Nature, { eager: true })
  @JoinTable()
  public nature: Nature[];

  @ManyToMany(() => Taste, { eager: true })
  @JoinTable()
  public taste: Taste[];

  @ManyToMany(() => MeridianTropism, { eager: true })
  @JoinTable()
  public meridianTropism: MeridianTropism[];

  @Column(() => DateColumn)
  date: DateColumn;
}
