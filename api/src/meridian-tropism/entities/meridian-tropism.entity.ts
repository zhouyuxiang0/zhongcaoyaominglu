import { DateColumn } from 'src/common/entities/date.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MeridianTropism {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  name: string;
  @Column(() => DateColumn)
  date: DateColumn;
}
