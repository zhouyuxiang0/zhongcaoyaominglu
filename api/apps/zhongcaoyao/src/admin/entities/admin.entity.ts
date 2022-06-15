import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumn } from '../../common/entities/date.entity';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column(() => DateColumn)
  date: DateColumn;
}
