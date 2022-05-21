import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DateColumn {
  @CreateDateColumn({ name: 'create_time' })
  public createTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  public updateTime: Date;
}
