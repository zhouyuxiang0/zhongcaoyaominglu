import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/base.entity';

@ObjectType()
@Entity()
export class Taste extends CommonEntity {
  @Field(() => String, { description: '' })
  @Column()
  name: string;
}
