import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/base.entity';

@ObjectType()
@Entity('meridian_tropism')
export class MeridianTropism extends CommonEntity {
  @Field(() => String, { description: '' })
  @Column()
  name: string;
}
