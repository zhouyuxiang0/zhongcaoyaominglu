import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/base.entity';

@Directive(`@key(fields: "id")`)
@ObjectType()
@Entity('category')
export class Category extends CommonEntity {
  @Field(() => String, { description: '分类名称' })
  @Column()
  name: string;
}
