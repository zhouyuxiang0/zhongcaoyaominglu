import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/base.entity';
import { MeridianTropism } from '../../meridian-tropism/entities/meridian-tropism.entity';
import { Nature } from '../../nature/entities/nature.entity';
import { Taste } from '../../taste/entities/taste.entity';

@ObjectType()
@Entity('chinese_medicine')
export class ChineseMedicine extends CommonEntity {
  @Column()
  name: string;

  @ManyToOne(() => Nature)
  @JoinColumn({ name: 'nature_id' })
  nature: Nature;

  @ManyToOne(() => Taste)
  @JoinColumn({ name: 'taste_id' })
  taste: Taste;

  @ManyToOne(() => MeridianTropism)
  @JoinColumn({ name: 'meridian_tropism_id' })
  meridianTropism: MeridianTropism;
}
