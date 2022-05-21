import { DateColumn } from 'src/common/entities/date.entity';
import { MeridianTropism } from 'src/meridian-tropism/entities/meridian-tropism.entity';
import { Nature } from 'src/nature/entities/nature.entity';
import { Taste } from 'src/taste/entities/taste.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChineseMedicine {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;

  @ManyToMany(() => Nature)
  public nature: Nature;

  @ManyToMany(() => Taste)
  public taste: Taste;

  @ManyToMany(() => MeridianTropism)
  public meridianTropism: MeridianTropism;
  @Column(() => DateColumn)
  date: DateColumn;
}
