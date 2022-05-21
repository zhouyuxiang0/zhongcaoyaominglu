import { DateColumn } from 'src/common/entities/date.entity';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column(() => DateColumn)
  date: DateColumn;
}
