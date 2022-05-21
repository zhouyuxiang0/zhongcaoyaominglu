import { DateColumn } from 'src/common/entities/date.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nature {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  name: string;
  @Column(() => DateColumn)
  date: DateColumn;
}
