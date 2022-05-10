import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@ObjectType({
  implements: () => [BaseEntity],
})
@Entity({
  name: 'category',
})
export class Category extends BaseEntity implements BaseEntity {
  id: number;
  @Field(() => String, { description: '分类名称' })
  @Column()
  name: string;
  createTime: Date;
  updateTime: Date;
}
