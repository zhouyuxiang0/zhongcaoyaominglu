import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/base.entity';
import { ChineseMedicine } from './chinese-medicine.entity';

@Entity('chinese_medicine_alias')
export class ChineseMedicineAlias extends CommonEntity {
  @ManyToOne(() => ChineseMedicine)
  @JoinColumn({ name: 'chinese_medicine_id' })
  chineseMedicine: ChineseMedicine;
  @Column()
  name: string;
}
